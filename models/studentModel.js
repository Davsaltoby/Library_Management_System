import mongoose from "mongoose";
import User from "./userModel.js";

const { Schema } = mongoose;

const studentSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: User.modelName },
    name: { type: String, required: true },
    email: { type: String, unique: true },
    studentId: { type: String, unique: true },
  },
  {
    timestamps: true,
  },
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
