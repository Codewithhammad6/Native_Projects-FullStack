import { catchAsyncError } from '../middleware/catchAsyncError.js';
import ErrorHandler from '../middleware/error.js';
import User from '../models/userModel.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dotenv from "dotenv";
dotenv.config();
import {sendToken} from '../utils/sendToken.js'


// REGISTER
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("All fields required", 400));
  }

  // Email format check
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return next(new ErrorHandler("Invalid email format", 400));
  }

  const existingUser = await User.findOne({ email,verified:true });

  if (existingUser) {
    return next(new ErrorHandler("Email is already used.", 400));
  }
  
  const newUser = new User({ name, email, password });

  // generate and store token
  const verificationToken = crypto.randomBytes(20).toString("hex");
  newUser.verificationToken = verificationToken;

  await newUser.save();

  // send verification email
  await sendVerificationEmail(newUser.email, verificationToken);

  res.status(201).json({
    success: true,
    message: "User registered successfully. Please check your email for verification."
  });
});

// SEND VERIFICATION EMAIL
const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: true, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const verifyUrl = `${process.env.APP_BASE_URL}/api/user/verify/${verificationToken}`;

  const mailOptions = {
    from: process.env.MAIL_FROM || `"HL" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Verify your email",
    html: `
      <div style="font-family:Arial;padding:20px">
        <h2>Welcome!</h2>
        <p>Please verify your email by clicking below:</p>
        <p>
          <a href="${verifyUrl}" style="background:#000;color:#fff;padding:10px 16px;border-radius:5px;text-decoration:none">
            Verify Email
          </a>
        </p>
        <p>Or copy this link: ${verifyUrl}</p>
      </div>
    `,
    text: `Verify your email: ${verifyUrl}`,
  };

  await transporter.sendMail(mailOptions);
};

// VERIFY EMAIL (via token link)
export const verifyEmail = catchAsyncError(async (req, res, next) => {
  const token = req.params.token;

  // Find user with given token
  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    return next(new ErrorHandler("Invalid verification token", 400));
  }

  user.verified = true;
  user.verificationToken = undefined;

  await user.save();

  res.status(200).json({ message: "Email verified successfully" });
  sendToken(user, 200, "User Login successfully.", res);

});



// LOGIN
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("All fields required", 400));
  }
  
  // Email format check
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return next(new ErrorHandler("Invalid email format", 400));
  }

  // Only login verified users
  const user = await User.findOne({ email, verified: true }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid credentials or email not verified", 400));
  }

  // check password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid password ", 400));
  }

  sendToken(user, 200, "User logged in successfully.", res);

});


export const getUser = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});


export const logout = catchAsyncError(async (req, res, next) => {
 res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "Lax",
    })
    .json({
      success: true,
      message:"Logout Successfully"
    });
    
});



export const addresses =catchAsyncError(async (req,res,next)=>{
  const user = req.user;
  const {address}=req.body;


// Find user
  const currentUser = await User.findById(user._id);
  if (!currentUser) {
    return next(new ErrorHandler("User not found", 404));
  }

    currentUser.addresses.push(address);

  await currentUser.save();

  res.status(200).json({
    success: true,
    message: "Address added successfully",
    addresses: currentUser.addresses,
  });

})


export const getAddresses = catchAsyncError(async (req, res, next) => {
  const user = req.user;

  // Find user
  const currentUser = await User.findById(user._id);
  if (!currentUser) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Addresses fetched successfully",
    addresses: currentUser.addresses,
  });
});
