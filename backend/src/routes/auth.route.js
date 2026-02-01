import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
const router = Router();
// Define your auth routes here

router.post("/register", signup);

router.post("/login", login);
router.post("/logout", logout);
export default router;
