import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../controllers/admin.controller.js";
import { getProductById } from "../controllers/product.controller.js";

const router = Router();

// Public routes
router.get("/", getAllProducts); // get all products
router.get("/:id", getProductById); // get single product by id

// Protected admin routes
router.use(protectRoute); // all routes below require authentication
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
