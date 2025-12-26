"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_2 = require("@clerk/express");
const express_3 = require("inngest/express");
const cors_1 = __importDefault(require("cors"));
const inngest_js_1 = require("./config/inngest.js");
const env_js_1 = require("./config/env.js");
const db_js_1 = require("./config/db.js");
const admin_route_js_1 = __importDefault(require("./routes/admin.route.js"));
const user_route_js_1 = __importDefault(require("./routes/user.route.js"));
const order_route_js_1 = __importDefault(require("./routes/order.route.js"));
const review_route_js_1 = __importDefault(require("./routes/review.route.js"));
const product_route_js_1 = __importDefault(require("./routes/product.route.js"));
const cart_route_js_1 = __importDefault(require("./routes/cart.route.js"));
const payment_route_js_1 = __importDefault(require("./routes/payment.route.js"));
const app = (0, express_1.default)();
const __dirname = path_1.default.resolve();
// special handling: Stripe webhook needs raw body BEFORE any body parsing middleware
// apply raw body parser conditionally only to webhook endpoint
app.use("/api/payment", (req, res, next) => {
    if (req.originalUrl === "/api/payment/webhook") {
        express_1.default.raw({ type: "application/json" })(req, res, next);
    }
    else {
        express_1.default.json()(req, res, next); // parse json for non-webhook routes
    }
}, payment_route_js_1.default);
app.use(express_1.default.json());
app.use((0, express_2.clerkMiddleware)()); // adds auth object under the req => req.auth
app.use((0, cors_1.default)({ origin: env_js_1.ENV.CLIENT_URL, credentials: true })); // credentials: true allows the browser to send the cookies to the server with the request
app.use("/api/inngest", (0, express_3.serve)({ client: inngest_js_1.inngest, functions: inngest_js_1.functions }));
app.use("/api/admin", admin_route_js_1.default);
app.use("/api/users", user_route_js_1.default);
app.use("/api/orders", order_route_js_1.default);
app.use("/api/reviews", review_route_js_1.default);
app.use("/api/products", product_route_js_1.default);
app.use("/api/cart", cart_route_js_1.default);
app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Success" });
});
// make our app ready for deployment
if (env_js_1.ENV.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "../admin/dist")));
    app.get("/{*any}", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../admin", "dist", "index.html"));
    });
}
const startServer = async () => {
    await (0, db_js_1.connectDB)();
    app.listen(env_js_1.ENV.PORT, () => {
        console.log("Server is up and running");
    });
};
startServer();
