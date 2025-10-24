import jwt from "jsonwebtoken" 
import User from "../models/User.js"
import { ENV } from "../lib/env.js"

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies && req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        // Use findById and await the result so we attach a plain document (or null)
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) return res.status(401).json({ message: "User not found" });

        // Convert to plain object to ensure it's serializable and doesn't contain
        // mongoose internal references that could include the connection/client.
        req.user = user.toObject ? user.toObject() : user;
        

        next();

    } catch (error) {
        // Optional: you could log the error here for debugging
        return res.status(401).json({ message: "Authentication failed" });
    }
};
