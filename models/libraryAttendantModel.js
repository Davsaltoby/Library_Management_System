import mongoose from "mongoose";

const { Schema } = mongoose;

const libraryAttendantSchema = new Schema(
  {
    name: { type: String, required: true },
    staffId: { type: String, unique: true },
  },
  {
    timestamps: true,
  },
);

const LibraryAttendant = mongoose.model("Attendant", libraryAttendantSchema);

export default LibraryAttendant;
