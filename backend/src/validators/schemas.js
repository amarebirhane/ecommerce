import { z } from "zod";

// ============================================================================
// COMMON VALIDATORS
// ============================================================================

export const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");

export const paginationSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
});

// ============================================================================
// ADDRESS SCHEMAS
// ============================================================================

export const addressSchema = z.object({
    label: z.string().min(1, "Label is required").max(50, "Label too long"),
    fullName: z.string().min(2, "Full name is required").max(100, "Name too long"),
    streetAddress: z.string().min(5, "Street address is required").max(200, "Address too long"),
    city: z.string().min(2, "City is required").max(100, "City name too long"),
    state: z.string().min(2, "State is required").max(100, "State name too long"),
    zipCode: z.string().min(3, "Zip code is required").max(20, "Zip code too long"),
    phoneNumber: z.string().min(7, "Phone number is required").max(20, "Phone number too long"),
    isDefault: z.boolean().default(false),
});

export const updateAddressSchema = addressSchema.partial();



// ============================================================================
// PRODUCT SCHEMAS
// ============================================================================

export const productSchema = z.object({
    name: z.string().min(2, "Product name is required").max(200, "Name too long"),
    description: z.string().min(10, "Description is required").max(2000, "Description too long"),
    price: z.coerce.number().positive("Price must be positive").max(999999.99, "Price too high"),
    stock: z.coerce.number().int().min(0, "Stock cannot be negative").max(999999, "Stock too high"),
    category: z.enum(["Electronics", "Fashion", "Sports", "Books", "Home", "Beauty", "Toys", "Other"], {
        errorMap: () => ({ message: "Invalid category" }),
    }),
});

export const updateProductSchema = productSchema.partial();



// ============================================================================
// CART SCHEMAS
// ============================================================================

export const addToCartSchema = z.object({
    productId: objectIdSchema,
    quantity: z.coerce.number().int().positive("Quantity must be at least 1").max(99, "Max 99 items").default(1),
});

export const updateCartItemSchema = z.object({
    quantity: z.coerce.number().int().positive("Quantity must be at least 1").max(99, "Max 99 items"),
});



// ============================================================================
// ORDER SCHEMAS
// ============================================================================

export const shippingAddressSchema = z.object({
    fullName: z.string().min(2, "Full name is required").max(100),
    streetAddress: z.string().min(5, "Street address is required").max(200),
    city: z.string().min(2, "City is required").max(100),
    state: z.string().min(2, "State is required").max(100),
    zipCode: z.string().min(3, "Zip code is required").max(20),
    phoneNumber: z.string().min(7, "Phone is required").max(20),
});

export const orderItemSchema = z.object({
    product: z.object({
        _id: objectIdSchema,
    }),
    name: z.string().min(1),
    price: z.number().positive(),
    quantity: z.number().int().positive(),
    image: z.string().url("Invalid image URL"),
});

export const createOrderSchema = z.object({
    orderItems: z.array(orderItemSchema).min(1, "At least one item is required"),
    shippingAddress: shippingAddressSchema,
    paymentResult: z.object({
        id: z.string(),
        status: z.string(),
    }).optional(),
    totalPrice: z.number().positive("Total price must be positive"),
});

export const updateOrderStatusSchema = z.object({
    status: z.enum(["pending", "shipped", "delivered"], {
        errorMap: () => ({ message: "Status must be pending, shipped, or delivered" }),
    }),
});



// ============================================================================
// REVIEW SCHEMAS
// ============================================================================

export const createReviewSchema = z.object({
    productId: objectIdSchema,
    orderId: objectIdSchema,
    rating: z.coerce.number().int().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
});



// ============================================================================
// PAYMENT SCHEMAS
// ============================================================================

export const createPaymentIntentSchema = z.object({
    cartItems: z.array(z.object({
        product: z.object({
            _id: objectIdSchema,
            name: z.string(),
            price: z.number(),
            images: z.array(z.string()).optional(),
        }),
        quantity: z.number().int().positive(),
    })).min(1, "Cart cannot be empty"),
    shippingAddress: shippingAddressSchema,
});



// ============================================================================
// WISHLIST SCHEMAS
// ============================================================================

export const wishlistSchema = z.object({
    productId: objectIdSchema,
});


