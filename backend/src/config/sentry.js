import * as Sentry from "@sentry/node";
import { ENV } from "./env.js";

Sentry.init({
    dsn: ENV.SENTRY_DSN,
    environment: ENV.NODE_ENV || "development",
    tracesSampleRate: 1.0,
});

export default Sentry;
