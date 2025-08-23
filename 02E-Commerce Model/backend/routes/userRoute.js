
import express from "express";
import { getOrders, getUser, login, logout, order, register } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.post("/logout",isAuthenticated, logout);
router.get("/me",isAuthenticated, getUser);





router.get("/getProducts",isAuthenticated, getOrders);
router.post("/addProduct",isAuthenticated,order)




export default router;