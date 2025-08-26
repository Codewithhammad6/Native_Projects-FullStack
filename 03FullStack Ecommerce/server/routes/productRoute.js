import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { 
  addProduct, 
  deleteProduct, 
  getProduct, 
  getProducts, 
  updateProduct 
} from "../controllers/productController.js";

const router = express.Router();

router.post("/add", addProduct);   
router.get("/all", getProducts); 
router.get("/:id", getProduct);      
router.put("/:id",  updateProduct);   
router.delete("/:id", deleteProduct); 

export default router;