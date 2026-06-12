import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        const authData = typeof req.auth === 'function' ? req.auth() : req.auth;
        const userId = authData?.userId;

        if (!userId) {
            return res.json({ success: false, message: "Not authenticated" });
        }

        // ✅ _id hi Clerk ID hai User model mein
        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found in DB" });
        }

        req.user = user;
        // ✅ req.auth bhi set karo taaki controller mein req.auth.userId kaam kare
        req.auth = { userId };
        next();
    } catch (error) {
        console.log("protect error:", error);
        return res.json({ success: false, message: error.message });
    }
}