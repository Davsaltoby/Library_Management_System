import mongoose from "mongoose";
import User from "./userModel.js";

const { Schema } = mongoose;

const libraryAttendantSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: User.modelName },
    name: { type: String, required: true },
    staffId: { type: String, unique: true },
  },
  {
    timestamps: true,
  },
);

const LibraryAttendant = mongoose.model("Attendant", libraryAttendantSchema);

export default LibraryAttendant;
