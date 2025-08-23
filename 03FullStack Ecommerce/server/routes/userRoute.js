import express from "express";
import { addresses, getAddresses, getUser, login, logout, register, verifyEmail } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post("/register",register)
router.get("/verify/:token", verifyEmail);
router.post("/login",login)
router.get("/me",isAuthenticated, getUser);
router.get("/logout",isAuthenticated, logout);
router.post("/addresses",isAuthenticated, addresses);
router.get("/getAddresses",isAuthenticated, getAddresses);


export default router;