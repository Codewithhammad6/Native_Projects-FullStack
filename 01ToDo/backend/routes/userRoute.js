import express from "express";
import { addText, AllTodo, del, update } from "../controllers/userController.js";
const router = express.Router();

router.post("/add",addText)
router.post("/update",update)
router.post("/del", del);
router.get("/get", AllTodo);




export default router;