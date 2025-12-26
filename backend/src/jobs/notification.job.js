import { inngest } from "../config/inngest.js";

export const sendOrderConfirmation = inngest.createFunction(
    { id: "send-order-confirmation" },
    { event: "order/created" },
    async ({ event }) => {
        const { orderId, email, products } = event.data;

        console.log(`[Notification] Sending order confirmation email to ${email} for order ${orderId}`);

        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Here you would use Resend, SendGrid, etc.
        // await resend.emails.send({ ... });

        return { sent: true, orderId };
    }
);
