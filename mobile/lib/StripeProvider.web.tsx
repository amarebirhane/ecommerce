import React from "react";

// On web, StripeProvider is a no-op wrapper since native Stripe doesn't work on web
export const StripeProvider = ({ children }: { children: React.ReactNode; publishableKey?: string }) => {
    return <>{children}</>;
};
