import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.json({ success: false, message: "Not authenticated" });
        }

        const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        const userId = decoded.sub;

        if (!userId) {
            return res.json({ success: false, message: "Not authenticated" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found in DB" });
        }

        req.user = user;
        req.auth = { userId };
        next();
    } catch (error) {
        console.log("protect error:", error);
        return res.json({ success: false, message: error.message });
    }
}