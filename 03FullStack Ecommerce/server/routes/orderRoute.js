import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { getOrders, orders } from "../controllers/orderController.js";
const router = express.Router();

router.post("/orders",isAuthenticated,orders)
router.get("/getOrders",isAuthenticated,getOrders)


export default router;