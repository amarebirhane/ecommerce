// admin.controller.js
import cloudinary from "../config/cloudinary.js";
import { Product } from "../models/product.model.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import logger from "../utils/logger.js";
import { asyncHandler } from "../middleware/error.middleware.js";

/* ===================== PRODUCTS ===================== */

export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, category } = req.body;

  if (!name || !description || !price || !stock || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "At least one image is required" });
  }

  if (req.files.length > 3) {
    return res.status(400).json({ message: "Maximum 3 images allowed" });
  }

  logger.info(`🛒 Creating product: ${name} in category: ${category}`);

  let uploadResults = [];
  try {
    uploadResults = await Promise.all(
      req.files.map((file) =>
        cloudinary.uploader.upload(file.path, { folder: "products" })
      )
    );
  } catch (uploadError) {
    logger.error("❌ Cloudinary Upload Failed:", uploadError);
    return res.status(400).json({
      message: `Image upload failed: ${uploadError.message}. Please check your Cloudinary credentials.`
    });
  }

  const product = await Product.create({
    name,
    description,
    price: Number(price),
    stock: Number(stock),
    category: category.toLowerCase(),
    images: uploadResults.map((r) => r.secure_url),
  });

  res.status(201).json(product);
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.status(200).json(products);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, description, price, stock, category } = req.body;

  if (name) product.name = name;
  if (description) product.description = description;
  if (price !== undefined) product.price = Number(price);
  if (stock !== undefined) product.stock = Number(stock);
  if (category) product.category = category.toLowerCase();

  if (req.files?.length) {
    if (req.files.length > 3) {
      return res.status(400).json({ message: "Maximum 3 images allowed" });
    }

    let uploads = [];
    try {
      uploads = await Promise.all(
        req.files.map((file) =>
          cloudinary.uploader.upload(file.path, { folder: "products" })
        )
      );
      product.images = uploads.map((r) => r.secure_url);
    } catch (uploadError) {
      return res.status(400).json({ message: "Image upload failed" });
    }
  }

  await product.save();
  res.status(200).json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (product.images?.length) {
    await Promise.all(
      product.images.map((url) => {
        const match = url.match(/products\/([^/.]+)/);
        if (!match) return null;
        return cloudinary.uploader.destroy(`products/${match[1]}`);
      })
    );
  }

  await Product.findByIdAndDelete(id);
  res.status(200).json({ message: "Product deleted successfully" });
});

/* ===================== ORDERS ===================== */

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("orderItems.product")
    .sort({ createdAt: -1 });

  res.status(200).json(orders);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!["pending", "shipped", "delivered"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.status = status;
  if (status === "shipped") order.shippedAt ??= new Date();
  if (status === "delivered") order.deliveredAt ??= new Date();

  await order.save();
  res.status(200).json(order);
});

/* ===================== USERS / STATS ===================== */

export const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await User.find().sort({ createdAt: -1 });
  res.status(200).json(customers);
});

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalOrders, totalCustomers, totalProducts, revenue] =
    await Promise.all([
      Order.countDocuments(),
      User.countDocuments(),
      Product.countDocuments(),
      Order.aggregate([
        { $group: { _id: null, total: { $sum: "$totalPrice" } } },
      ]),
    ]);

  res.status(200).json({
    totalOrders,
    totalCustomers,
    totalProducts,
    totalRevenue: revenue[0]?.total || 0,
  });
});
