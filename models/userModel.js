import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "attendant"],
      default: "student",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
