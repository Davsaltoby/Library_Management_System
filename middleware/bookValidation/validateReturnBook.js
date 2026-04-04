import Book from "../../models/bookModel.js";
import Student from "../../models/studentModel.js";
import mongoose from "mongoose";

const validateReturnBook = async (req, res, next) => {
  const bookId = req.params.id;
  const { studentId } = req.body;

  //   validate that studentId is not empty

  if (!studentId) {
    return res
      .status(400)
      .json({ error: { message: "studentId is required" } });
  }

  //   validate that the id format are not invalid

  const invalidId = !mongoose.Types.ObjectId.isValid(bookId);

  if (invalidId) {
    return res.status(400).json({
      erorr: { message: `invalid book id format ${invalidId}` },
    });
  }

  //   validate that this book exists

  const book = await Book.findById(bookId);
  if (!book) {
    return res.status(404).json({ error: { message: "book not found" } });
  }

  //   validate that this book is borrowed

  if (book.status !== "OUT") {
    return res
      .status(400)
      .json({ error: { message: "this book was not borrowed" } });
  }

  //   validate that this student exists

  const student = await Student.findOne({ studentId: studentId });
  if (!student) {
    return res.status(404).json({ error: { message: "student not found" } });
  }

  //   validate that this book was borrowed by this student

  if (!book.borrowedBy.equals(student._id)) {
    return res.status(403).json({
      error: { message: "this book was not borrowed by this student" },
    });
  }

  req.book = book;
  req.student = student;

  next();
};

export default validateReturnBook;
