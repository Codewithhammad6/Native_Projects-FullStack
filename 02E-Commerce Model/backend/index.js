import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./database/dbConnection.js"; 
import userRoute from './routes/userRoute.js'
import { errorMiddleware } from "./middleware/error.js";
import cookieParser from "cookie-parser";

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

connectDB();

app.use("/api/v1/user", userRoute);


app.use(errorMiddleware)