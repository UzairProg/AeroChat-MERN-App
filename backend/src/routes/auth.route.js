import { Router } from "express";
import { signup, login, logout, updateProfile } from "../controllers/signup.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = Router();

// router.use(arcjetProtection);

router.get('/test', (req, res) => {
    res.send("Auth route is working");
});

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.put('/update-profile', authMiddleware, updateProfile);

router.get('/check-auth', authMiddleware, (req, res) => {
    res.status(200).json(
        req.user
    ).select("-password");
});

export default router;