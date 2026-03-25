import mongoose from "mongoose";
import Author from "./authorModel";
import Student from "./studentModel";
import LibraryAttendant from "./libraryAttendantModel";

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: { type: String, required: true },
  isbn: { type: String, unique: true },
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: Author.modelName }],
  status: { type: string, enum: ["IN", "OUT"], default: "IN" },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Student.modelName,
    default: null,
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: LibraryAttendant.modelName,
    default: null,
  },
  returnDate: { type: Date, default: null },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Book = mongoose.model("Model", bookSchema);

export default Book;
