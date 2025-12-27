import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ENV } from "../config/env.js";

const createAdmin = async () => {
    try {
        await mongoose.connect(ENV.MONGODB_URI);

        const emailArg = process.argv[2];
        const adminEmail = emailArg || ENV.ADMIN_EMAIL;

        if (!adminEmail) {
            console.error("❌ ADMIN_EMAIL is not defined in .env and no email provided as argument");
            process.exit(1);
        }

        console.log(`Searching for user with email: ${adminEmail}`);

        let user = await User.findOne({ email: adminEmail });

        if (user) {
            console.log(`Found user: ${user.name} (${user.email}). Current role: ${user.role}`);
            user.role = "admin";
            await user.save();
            console.log(`✅ Successfully promoted ${user.email} to admin!`);
        } else {
            console.log(`❌ No user found with email ${adminEmail}.`);
            console.log(`💡 Please log into the app first so your account is synced, then run this script again.`);
            console.log(`Or, update your .env ADMIN_EMAIL to match your Clerk account email.`);
        }

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
};

createAdmin();
