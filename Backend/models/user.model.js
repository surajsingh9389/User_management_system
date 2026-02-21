import mongoose from "mongoose";

// Define User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 30 },
    lastName: { type: String, trim: true, required: true, maxlength: 30 },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
      required: true,
    },
    age: { type: Number, required: true, min: 1 },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "InActive"],
      default: "Active",
      required: true,
    },
    profileImage: {
      type: String,
    },
  },
  {
    // Automatically adds createdAt and updatedAt
    timestamps: true,
  },
);

// Create model
const User = mongoose.model("User", userSchema);

export default User;
