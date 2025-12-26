import { inngest } from "../config/inngest.js";
import { Order } from "../models/order.model.js";

export const processOrder = inngest.createFunction(
    { id: "process-order" },
    { event: "order/created" },
    async ({ event }) => {
        const { orderId } = event.data;

        console.log(`[OrderProcessing] Processing order ${orderId}`);

        // Simulate processing (e.g. validting, preparing for shipment)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Update order status (example)
        /*
        await Order.findByIdAndUpdate(orderId, { 
            status: "processing", 
            processedAt: new Date() 
        });
        */

        return { processed: true, orderId };
    }
);
