import mongoose from "mongoose";

const { Schema } = mongoose;

const libraryAttendantSchema = new Schema({
  name: { type: String, required: true },
  staffId: { type: String, unique: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const LibraryAttendant = mongoose.model(
  "LibraryAttendant",
  libraryAttendantSchema,
);

export default LibraryAttendant;
