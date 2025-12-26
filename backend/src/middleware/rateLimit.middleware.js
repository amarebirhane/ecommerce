import rateLimit from "express-rate-limit";

/**
 * Standard API rate limiter
 * 100 requests per 15 minutes per IP
 */
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: {
        success: false,
        error: "Too many requests, please try again later",
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        return req.ip || req.headers["x-forwarded-for"]?.toString() || "unknown";
    },
});

/**
 * Strict rate limiter for auth endpoints
 * 5 requests per 15 minutes per IP
 */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: {
        success: false,
        error: "Too many authentication attempts, please try again later",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * Payment rate limiter
 * 10 payment attempts per hour per IP
 */
export const paymentLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10,
    message: {
        success: false,
        error: "Too many payment attempts, please try again later",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * Order creation rate limiter
 * 20 orders per hour per IP
 */
export const orderLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20,
    message: {
        success: false,
        error: "Too many orders, please try again later",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * Search/listing rate limiter (more lenient)
 * 200 requests per 15 minutes per IP
 */
export const searchLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200,
    message: {
        success: false,
        error: "Too many requests, please try again later",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * Webhook rate limiter (allow more for Stripe webhooks)
 * 1000 requests per 15 minutes
 */
export const webhookLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000,
    message: {
        success: false,
        error: "Too many webhook requests",
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
        // Skip rate limiting for Stripe webhooks with valid signature header
        return !!req.headers["stripe-signature"];
    },
});
