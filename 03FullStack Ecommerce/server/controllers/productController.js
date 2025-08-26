import { catchAsyncError } from '../middleware/catchAsyncError.js';
import ErrorHandler from '../middleware/error.js';
import Product from "../models/productModel.js";
import { v4 as uuidv4 } from "uuid";

export const addProduct = catchAsyncError(async (req, res, next) => {
  const {
    title,
    offer,
    oldPrice,
    price,
    carouselImages,
    color,
    size,
    trendingDeal,
    todayDeal,
    category
  } = req.body;

  if (!title || !price) {
    return next(new ErrorHandler("Please provide required fields", 400));
  }

  const product = await Product.create({
    id: uuidv4(), // auto-generate unique id
    title,
    offer,
    oldPrice,
    price,
    image:carouselImages[0],
    carouselImages,
    color,
    size,
     trendingDeal,
    todayDeal,
    category
  });

  res.status(201).json({
    success: true,
    message: "Product added successfully",
    product,
  });
});








// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products"
    });
  }
};

// Get single product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    
    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.error("Get product error:", error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Server error while fetching product"
    });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    console.error("Update product error:", error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Server error while updating product"
    });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    
    await Product.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    console.error("Delete product error:", error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Server error while deleting product"
    });
  }
};