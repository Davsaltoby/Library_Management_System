import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, default: null },
    role: {
      type: String,
      enum: ["student", "attendant", "admin"],
      default: "student",
      required: true,
    },
    isActive: { type: Boolean, default: false },
    inviteToken: { type: String, default: null },
    inviteExpiry: { type: Date, default: null },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
