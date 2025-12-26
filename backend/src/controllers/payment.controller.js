
import Stripe from "stripe";
import { ENV } from "../config/env.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
import {
  asyncHandler,
  NotFoundError,
  InsufficientStockError,
  ValidationError,
  AppError
} from "../middleware/error.middleware.js";

const stripe = new Stripe(ENV.STRIPE_SECRET_KEY);

// ============================================================================
// PAYMENT CONSTANTS
// ============================================================================

const SHIPPING_COST = 10.00; // $10 flat rate
const TAX_RATE = 0.08; // 8% tax

// ============================================================================
// PAYMENT CONTROLLERS
// ============================================================================

/**
 * Create a Stripe payment intent
 * @route POST /api/v1/payment/create-intent
 */
export const createPaymentIntent = asyncHandler(
  async (req, res) => {
    const { cartItems, shippingAddress } = req.body;
    const user = req.user;

    // Validate cart items and calculate total from server-side data
    // NEVER trust client-provided prices
    let subtotal = 0;
    const validatedItems = [];

    for (const item of cartItems) {
      const product = await Product.findById(item.product._id);

      if (!product) {
        throw new NotFoundError(`Product ${item.product.name}`);
      }

      if (product.stock < item.quantity) {
        throw new InsufficientStockError(product.name);
      }

      subtotal += product.price * item.quantity;

      validatedItems.push({
        product: product._id.toString(),
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.images[0] || "",
      });
    }

    const shipping = SHIPPING_COST;
    const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
    const total = subtotal + shipping + tax;

    if (total <= 0) {
      throw new ValidationError("Invalid order total");
    }

    // Find or create Stripe customer
    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          clerkId: user.clerkId,
          userId: user._id.toString(),
        },
      });

      customerId = customer.id;

      // Save customer ID to user
      await User.findByIdAndUpdate(user._id, {
        stripeCustomerId: customer.id
      });
    }

    // Create payment intent with full metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Convert to cents
      currency: "usd",
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        clerkId: user.clerkId,
        userId: user._id.toString(),
        orderItems: JSON.stringify(validatedItems),
        shippingAddress: JSON.stringify(shippingAddress),
        subtotal: subtotal.toFixed(2),
        shipping: shipping.toFixed(2),
        tax: tax.toFixed(2),
        totalPrice: total.toFixed(2),
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      breakdown: {
        subtotal,
        shipping,
        tax,
        total,
      }
    });
  }
);

/**
 * Handle Stripe webhook events
 * @route POST /api/v1/payment/webhook
 */
export async function handleWebhook(req, res) {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      ENV.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const error = err;
    console.error("Webhook signature verification failed:", error.message);
    res.status(400).json({ error: `Webhook Error: ${error.message}` });
    return;
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      await handlePaymentSuccess(event.data.object);
      break;

    case "payment_intent.payment_failed":
      await handlePaymentFailure(event.data.object);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({ received: true });
}

/**
 * Handle successful payment
 */
async function handlePaymentSuccess(paymentIntent) {
  console.log("Payment succeeded:", paymentIntent.id);

  const {
    userId,
    clerkId,
    orderItems,
    shippingAddress,
    totalPrice
  } = paymentIntent.metadata;

  try {
    // Check for duplicate order
    const existingOrder = await Order.findOne({
      "paymentResult.id": paymentIntent.id
    });

    if (existingOrder) {
      console.log("Order already exists for payment:", paymentIntent.id);
      return;
    }

    // Parse metadata
    const parsedOrderItems = JSON.parse(orderItems);
    const parsedShippingAddress = JSON.parse(shippingAddress);

    // Create order
    const order = await Order.create({
      user: userId,
      clerkId,
      orderItems: parsedOrderItems,
      shippingAddress: parsedShippingAddress,
      paymentResult: {
        id: paymentIntent.id,
        status: "succeeded",
      },
      totalPrice: parseFloat(totalPrice),
      status: "pending",
    });

    // Update product stock atomically
    for (const item of parsedOrderItems) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } },
        { runValidators: true }
      );
    }

    // Clear user's cart
    await Cart.findOneAndUpdate(
      { clerkId },
      { $set: { items: [] } }
    );

    console.log("Order created successfully:", order._id);

    // TODO: Trigger Inngest job for order confirmation email
    // await inngest.send({ name: "order/created", data: { orderId: order._id } });

  } catch (error) {
    console.error("Error creating order from webhook:", error);
    // Don't throw - we don't want to retry the webhook
    // Instead, log to error monitoring system
  }
}

/**
 * Handle payment failure
 */
async function handlePaymentFailure(paymentIntent) {
  console.log("Payment failed:", paymentIntent.id);

  // Log failure for monitoring
  // Could trigger notification to user

  // TODO: Trigger Inngest job for payment failure notification
  // await inngest.send({ name: "payment/failed", data: { paymentIntentId: paymentIntent.id } });
}

/**
 * Get payment methods for user
 * @route GET /api/v1/payment/methods
 */
export const getPaymentMethods = asyncHandler(
  async (req, res) => {
    const user = req.user;

    if (!user.stripeCustomerId) {
      res.status(200).json({ paymentMethods: [] });
      return;
    }

    const paymentMethods = await stripe.paymentMethods.list({
      customer: user.stripeCustomerId,
      type: "card",
    });

    const methods = paymentMethods.data.map((pm) => ({
      id: pm.id,
      brand: pm.card?.brand,
      last4: pm.card?.last4,
      expiryMonth: pm.card?.exp_month,
      expiryYear: pm.card?.exp_year,
    }));

    res.status(200).json({ paymentMethods: methods });
  }
);
