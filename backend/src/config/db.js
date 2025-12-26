import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    if (!ENV.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    const conn = await mongoose.connect(ENV.MONGODB_URI);
    console.log(`✅ Connected to MONGODB: ${conn.connection.host}`);
  } catch (error) {
    console.error("💥 MONGODB connection error:", error.message);
    if (error.message.includes("MONGODB_URI")) {
      console.error("Please check your .env file and ensure MONGODB_URI is set");
    }
    process.exit(1); // exit code 1 means failure, 0 means success
  }
};
