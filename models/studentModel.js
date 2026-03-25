import mongoose from "mongoose";

const { Schema } = mongoose;

const studentSchema = new Schema({
  name: { type: string, required: true },
  email: { type: string, unique: true },
  studentId: { type: string, unique: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
