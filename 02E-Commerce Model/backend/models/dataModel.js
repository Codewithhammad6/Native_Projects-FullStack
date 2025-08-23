import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  itemName: {
    type: String,
  },
  price: {
    type: String,
  },
  userId: {
    type: String,
  },

},{timestamps:true});



const Data = mongoose.model("Data", userSchema);
export default Data;