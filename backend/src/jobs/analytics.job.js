import { inngest } from "../config/inngest.js";

export const trackOrderAnalytics = inngest.createFunction(
    { id: "track-order-analytics" },
    { event: "order/created" },
    async ({ event }) => {
        const { orderId, totalAmount, userId } = event.data;

        console.log(`[Analytics] Order created: ${orderId} by user ${userId} for $${totalAmount}`);

        // Here you would typically send this data to Segment, Mixpanel, Google Analytics, etc.
        // await analytics.track({
        //     event: "Order Completed",
        //     userId,
        //     properties: { orderId, totalAmount }
        // });

        return { tracked: true, orderId };
    }
);
