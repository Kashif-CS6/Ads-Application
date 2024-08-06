import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  gender: String,
});

export const User = mongoose.models.users || mongoose.model("users", userModel);
