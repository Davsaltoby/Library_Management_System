import validator from "validator";
import Author from "../../models/authorModel.js";
import Student from "../../models/studentModel.js";
import LibraryAttendant from "../../models/libraryAttendantModel.js";
import Book from "../../models/bookModel.js";
import mongoose from "mongoose";

export const validateCreateBook = async (req, res, next) => {
  const { title, isbn, authors } = req.body;

  if (!title?.trim() || !isbn || !authors) {
    return res
      .status(400)
      .json({ error: { message: "All fields are required" } });
  }
  if (!validator.isISBN(isbn)) {
    return res.status(400).json({ error: { message: "Invalid isbn" } });
  }

  if (!Array.isArray(authors)) {
    return res
      .status(400)
      .json({ error: { message: "authors property must be an array" } });
  }

  if (authors.length === 0) {
    return res
      .status(400)
      .json({ error: { message: "At least one author is required" } });
  }

  const book = await Book.findOne({ isbn: isbn });

  if (book) {
    return res.status(409).json({
      error: { message: `Book with isbn: ${book.isbn} already exists` },
    });
  }

  const invalidIds = authors.filter(
    (id) => !mongoose.Types.ObjectId.isValid(id),
  );
  if (invalidIds.length > 0) {
    return res
      .status(400)
      .json({
        erorr: { message: `Invalid Id format ${invalidIds.join(",")}` },
      });
  }

  const exisitingAuthors = await Author.find({ _id: { $in: authors } });

  if (exisitingAuthors.length !== authors.length) {
    return res
      .status(404)
      .json({ error: { message: "One or more authors not found" } });
  }

  next();
};
