// middleware/auth.middleware.js
import { requireAuth, getAuth } from "@clerk/express";
import { User } from "../models/user.model.js";
import clerkClient from "../config/clerk.js";
import { ENV } from "../config/env.js";

export const protectRoute = [
  requireAuth(), // ensures user is logged in via Clerk
  async (req, res, next) => {
    try {
      const { userId, sessionClaims } = getAuth(req);

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      let user = await User.findOne({ clerkId: userId });

      // Only create user if it does NOT exist
      if (!user) {
        console.log(`Syncing new user to DB: ${userId}`);

        // Try getting info from session claims first
        let email = sessionClaims?.email || sessionClaims?.email_address;
        let name = sessionClaims?.name ||
          `${sessionClaims?.given_name || ""} ${sessionClaims?.family_name || ""}`.trim();
        let imageUrl = sessionClaims?.picture || "";

        // Fallback: If session claims are missing, fetch directly from Clerk API
        if (!email || !name) {
          console.log("Session claims missing info, fetching from Clerk API...");
          try {
            const clerkUser = await clerkClient.users.getUser(userId);
            email = clerkUser.emailAddresses[0]?.emailAddress;
            name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim();
            imageUrl = clerkUser.imageUrl;
          } catch (clerkError) {
            console.error("Clerk API fetch failed:", clerkError);
          }
        }

        if (!email || !name) {
          console.error(`Failed to sync user ${userId}: missing email or name`);
          return res
            .status(400)
            .json({ message: "Missing required user info (email/name) to create account" });
        }

        user = await User.create({
          clerkId: userId,
          email,
          name,
          imageUrl,
          role: email === ENV.ADMIN_EMAIL ? "admin" : "user",
        });

        console.log(`Successfully synced user: ${email}`);
      }

      req.user = user; // attach user to request
      next();
    } catch (error) {
      console.error("protectRoute error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

// Admin-only middleware
export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  next();
};
