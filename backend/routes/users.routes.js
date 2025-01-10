import express from "express";
import { signup, login, logout, purchases } from "../controllers/users.controller.js";
import userMiddleware from "../middleware/user.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/purchases", userMiddleware, purchases);

export default router;