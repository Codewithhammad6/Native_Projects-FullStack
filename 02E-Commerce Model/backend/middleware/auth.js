import jwt from 'jsonwebtoken';
import ErrorHandler from '../middleware/error.js';
import User from '../models/userModel.js';
import { catchAsyncError } from './catchAsyncError.js';

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    let token = req.cookies?.token;
    if (!token && req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new ErrorHandler('Login first to access this resource', 401));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user without password
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return next(new ErrorHandler('User not found', 404));
    }

    next();
  } catch (error) {
    return next(new ErrorHandler('Invalid token. Please login again.', 401));
  }
});
