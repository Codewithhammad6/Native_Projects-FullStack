import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import User from "../models/userModel.js";
import Data from "../models/dataModel.js";
import { sendToken } from "../utils/sendToken.js";



export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("All fields required", 400));
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { name }],
  });

  if (existingUser) {
    return next(new ErrorHandler("Username or Email is already used.", 400));
  }
  const user = await User.create({ name, email, password });

  if (user) {
    sendToken(user, 200, "Registration Successful", res);
  }
});

export const login = catchAsyncError(async (req, res, next) => {
  const {email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("All fields required", 400));
  }

  const user = await User.findOne({email}).select("+password");

  if (!user) {
    return next(new ErrorHandler("User not found.", 400));
  }

const isPasswordMatched = await user.comparePassword(password);
if (!isPasswordMatched) {
  return next(new ErrorHandler("Invalid email or password.", 400));
}
   sendToken(user, 200, "Login Successful", res);

});



export const logout = catchAsyncError(async (req, res, next) => {
   res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
         expires: new Date(Date.now()),
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })
    .json({
   success: true,
     message: "Logged out successfully",
    });
});

export const getUser = catchAsyncError(async (req, res, next) => {
   const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});










export const order = catchAsyncError(async (req, res, next) => {
  const { itemName, price, userId } = req.body;

  if (!itemName || !price || !userId) {
    return next(new ErrorHandler("Invalid Credentials", 400));
  }

  const data = await Data.create({ itemName, price, userId });

  res.status(200).json({
    success: true,
    message: "Added Successfully",
    data
  });
});


export const getOrders = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id; // Comes from isAuthenticated

  const data = await Data.find({ userId });

  res.status(200).json({
    success: true,
    message: "Orders retrieved successfully",
    data
  });
});
