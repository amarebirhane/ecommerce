// admin.controller.js
import cloudinary from "../config/cloudinary.js";
import { Product } from "../models/product.model.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/api-response.js";
import logger from "../utils/logger.js";
import { asyncHandler } from "../middleware/error.middleware.js";

/* ===================== PRODUCTS ===================== */

export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, stock, category } = req.body;

  if (!name || !description || !price || !stock || !category) {
    return res.status(400).json(new ApiResponse(400, null, "All fields are required"));
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json(new ApiResponse(400, null, "At least one image is required"));
  }

  if (req.files.length > 3) {
    return res.status(400).json(new ApiResponse(400, null, "Maximum 3 images allowed"));
  }

  logger.info(`🛒 Creating product: ${name} in category: ${category}`);

  const uploadResults = await Promise.all(
    req.files.map((file) =>
      cloudinary.uploader.upload(file.path, { folder: "products" })
    )
  );

  const product = await Product.create({
    name,
    description,
    price: Number(price),
    stock: Number(stock),
    category: category.toLowerCase(),
    images: uploadResults.map((r) => r.secure_url),
  });

  res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json(new ApiResponse(404, null, "Product not found"));
  }

  const { name, description, price, stock, category } = req.body;

  if (name) product.name = name;
  if (description) product.description = description;
  if (price !== undefined) product.price = Number(price);
  if (stock !== undefined) product.stock = Number(stock);
  if (category) product.category = category.toLowerCase();

  if (req.files?.length) {
    if (req.files.length > 3) {
      return res.status(400).json(new ApiResponse(400, null, "Maximum 3 images allowed"));
    }

    const uploads = await Promise.all(
      req.files.map((file) =>
        cloudinary.uploader.upload(file.path, { folder: "products" })
      )
    );

    product.images = uploads.map((r) => r.secure_url);
  }

  await product.save();
  res.status(200).json(new ApiResponse(200, product, "Product updated successfully"));
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json(new ApiResponse(404, null, "Product not found"));
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
  res.status(200).json(new ApiResponse(200, null, "Product deleted successfully"));
});

/* ===================== ORDERS ===================== */

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("orderItems.product")
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!["pending", "shipped", "delivered"].includes(status)) {
    return res.status(400).json(new ApiResponse(400, null, "Invalid status"));
  }

  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json(new ApiResponse(404, null, "Order not found"));
  }

  order.status = status;
  if (status === "shipped") order.shippedAt ??= new Date();
  if (status === "delivered") order.deliveredAt ??= new Date();

  await order.save();
  res.status(200).json(new ApiResponse(200, order, "Order status updated successfully"));
});

/* ===================== USERS / STATS ===================== */

export const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await User.find().sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, customers, "Customers fetched successfully"));
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

  res.status(200).json(new ApiResponse(200, {
    totalOrders,
    totalCustomers,
    totalProducts,
    totalRevenue: revenue[0]?.total || 0,
  }, "Dashboard stats fetched successfully"));
});
