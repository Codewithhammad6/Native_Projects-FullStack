import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import User from "../models/userModel.js";

// Add new note
export const addText = catchAsyncError(async (req, res, next) => {
  const { text } = req.body;

  if (!text) {
    return next(new ErrorHandler("Add Text required", 400));
  }

  const user = await User.create({ text });

  res.status(200).json({
    success: true,
    message: "Notes Added Successfully",
    data: user
  });
});

// Update note
export const update = catchAsyncError(async (req, res, next) => {
  const { text, id } = req.body;

  if (!text || !id) {
    return next(new ErrorHandler("Missing requirement", 400));
  }

  const todo = await User.findById(id).select("+createdAt");

  if (!todo) {
    return next(new ErrorHandler("Notes not found.", 400));
  }

  todo.text = text;
  await todo.save();

  res.status(200).json({
    success: true,
    message: "Notes Updated Successfully",
    data: todo
  });
});

// Delete note
export const del = catchAsyncError(async (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    return next(new ErrorHandler("Missing requirement", 400));
  }

  const todo = await User.findByIdAndDelete(id);

  if (!todo) {
    return next(new ErrorHandler("Notes not found.", 400));
  }

  res.status(200).json({
    success: true,
    message: "Deleted Successfully",
  });
});

// Get all notes
export const AllTodo = catchAsyncError(async (req, res, next) => {
  const todos = await User.find();
  if (!todos || todos.length === 0) {
    return next(new ErrorHandler("Notes not found.", 400));
  }

  res.status(200).json({
    success: true,
    todos,
  });
});
