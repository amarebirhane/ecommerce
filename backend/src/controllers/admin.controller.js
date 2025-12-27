// admin.controller.js
import cloudinary from "../config/cloudinary.js";
import { Product } from "../models/product.model.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";

/* ===================== PRODUCTS ===================== */

export async function createProduct(req, res) {
  try {
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
      category,
      images: uploadResults.map((r) => r.secure_url),
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("❌ createProduct:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ getAllProducts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, description, price, stock, category } = req.body;

    if (name) product.name = name;
    if (description) product.description = description;
    if (price !== undefined) product.price = Number(price);
    if (stock !== undefined) product.stock = Number(stock);
    if (category) product.category = category;

    if (req.files?.length) {
      if (req.files.length > 3) {
        return res.status(400).json({ message: "Maximum 3 images allowed" });
      }

      const uploads = await Promise.all(
        req.files.map((file) =>
          cloudinary.uploader.upload(file.path, { folder: "products" })
        )
      );

      product.images = uploads.map((r) => r.secure_url);
    }

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.error("❌ updateProduct:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

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
  } catch (error) {
    console.error("❌ deleteProduct:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
}

/* ===================== ORDERS ===================== */

export async function getAllOrders(req, res) {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ getAllOrders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["pending", "shipped", "delivered"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    if (status === "shipped") order.shippedAt ??= new Date();
    if (status === "delivered") order.deliveredAt ??= new Date();

    await order.save();
    res.status(200).json(order);
  } catch (error) {
    console.error("❌ updateOrderStatus:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/* ===================== USERS / STATS ===================== */

export async function getAllCustomers(req, res) {
  try {
    const customers = await User.find().sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error getAllCustomers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getDashboardStats(req, res) {
  try {
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
  } catch (error) {
    console.error(" getDashboardStats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
