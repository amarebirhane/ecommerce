import { Document, Types } from "mongoose";
import { Request } from "express";

// ============================================================================
// BASE INTERFACES
// ============================================================================

export interface IAddress {
    _id?: Types.ObjectId;
    label: string;
    fullName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    isDefault: boolean;
}

export interface IUser extends Document {
    _id: Types.ObjectId;
    email: string;
    name: string;
    imageUrl: string;
    clerkId: string;
    stripeCustomerId: string;
    addresses: Types.DocumentArray<IAddress & Document>;
    wishlist: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IProduct extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    images: string[];
    averageRating: number;
    totalReviews: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICartItem {
    product: Types.ObjectId | IProduct;
    quantity: number;
}

export interface ICart extends Document {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    clerkId: string;
    items: ICartItem[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IOrderItem {
    product: Types.ObjectId | IProduct;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface IShippingAddress {
    fullName: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
}

export interface IPaymentResult {
    id: string;
    status: string;
}

export type OrderStatus = "pending" | "shipped" | "delivered";

export interface IOrder extends Document {
    _id: Types.ObjectId;
    user: Types.ObjectId;
    clerkId: string;
    orderItems: IOrderItem[];
    shippingAddress: IShippingAddress;
    paymentResult: IPaymentResult;
    totalPrice: number;
    status: OrderStatus;
    deliveredAt?: Date;
    shippedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface IReview extends Document {
    _id: Types.ObjectId;
    productId: Types.ObjectId;
    userId: Types.ObjectId;
    orderId: Types.ObjectId;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}

// ============================================================================
// REQUEST INTERFACES
// ============================================================================

export interface AuthenticatedRequest extends Request {
    user: IUser;
    auth: () => { userId: string | null };
}

// ============================================================================
// API RESPONSE INTERFACES
// ============================================================================

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    errors?: ValidationError[];
}

export interface ValidationError {
    field: string;
    message: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// ============================================================================
// DASHBOARD STATS
// ============================================================================

export interface DashboardStats {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
}
