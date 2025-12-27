// product.model.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: ["electronics", "fashion", "books", "home", "other"], // adjust as needed
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
      validate: {
        validator: function (arr) {
          return arr.length > 0 && arr.length <= 3; // max 3 images
        },
        message: "Images array must have 1 to 3 items",
      },
    },
    averageRating: {
      type: Number,
      min: [0, "Rating cannot be below 0"],
      max: [5, "Rating cannot exceed 5"],
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: [0, "Total reviews cannot be negative"],
    },
  },
  { timestamps: true }
);

// Optional: index category for faster queries
productSchema.index({ category: 1 });

export const Product = mongoose.model("Product", productSchema);
