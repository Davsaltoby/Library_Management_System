import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: { type: string, required: true },
  bio: string,
  createdAt: { type: Date, default: Date.now },
});

const Author = mongoose.model("Author", authorSchema);

export default Author;
