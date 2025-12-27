import express from "express";
import path from "path";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";

// Routes & Jobs
import adminRoutes from "./routes/admin.route.js";
import userRoutes from "./routes/user.route.js";
import orderRoutes from "./routes/order.route.js";
import reviewRoutes from "./routes/review.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import paymentRoutes from "./routes/payment.route.js";

import { userFunctions, inngest } from "./config/inngest.js";
import { trackOrderAnalytics } from "./jobs/analytics.job.js";
import { sendOrderConfirmation } from "./jobs/notification.job.js";
import { processOrder } from "./jobs/order-processing.job.js";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

// Swagger Imports
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./config/swagger.js";

const app = express();
const __dirname = path.resolve();

app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(clerkMiddleware());
app.use(
  "/api/payment",
  (req, res, next) => {
    if (req.originalUrl === "/api/payment/webhook") {
      express.raw({ type: "application/json" })(req, res, next);
    } else {
      express.json()(req, res, next);
    }
  },
  paymentRoutes
);
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [
      ...userFunctions,
      trackOrderAnalytics,
      sendOrderConfirmation,
      processOrder,
    ],
  })
);
const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Success" });
});
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin/dist/index.html"));
  });
}
const startServer = async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log(`swagger docs available at http://localhost:${ENV.PORT}/api-docs`);
    console.log(`server running on port ${ENV.PORT}`);
  });
};

startServer();
