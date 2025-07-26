import express from "express";
import { register,login,profile,logout } from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/getme",auth,profile);

export default router;