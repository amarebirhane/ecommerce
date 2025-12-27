import { Router } from "express";
import {
  createProduct,
  getAllCustomers,
  getAllOrders,
  getAllProducts,
  getDashboardStats,
  updateOrderStatus,
  updateProduct,
  deleteProduct,
} from "../controllers/admin.controller.js";
import { adminOnly, protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

// Protect all routes and restrict to admin
router.use(protectRoute, adminOnly);

// Product routes
router.post("/products", upload.array("images", 3), createProduct);
router.get("/products", getAllProducts);
router.put("/products/:id", upload.array("images", 3), updateProduct);
router.delete("/products/:id", deleteProduct);

// Order routes
router.get("/orders", getAllOrders);
router.patch("/orders/:orderId/status", updateOrderStatus);

// Customer routes
router.get("/customers", getAllCustomers);

// Dashboard stats
router.get("/stats", getDashboardStats);

export default router;
