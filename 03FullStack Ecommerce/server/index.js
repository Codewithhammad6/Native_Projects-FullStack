import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./database/dbConnection.js"; 
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import productRoute from "./routes/productRoute.js";
import { removeUnverifiedAccounts } from "./automation/removeUnverifiedUser.js";

dotenv.config();

export const app = express();

// Middleware
app.use(
  cors({
     origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

removeUnverifiedAccounts()
connectDB();

app.use("/api/user",userRoute)
app.use("/api/order",orderRoute)
app.use("/api/product",productRoute)

app.use(errorMiddleware)
