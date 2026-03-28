import Book from "../../models/bookModel.js";
import mongoose from "mongoose";
import Student from "../../models/studentModel.js";
import LibraryAttendant from "../../models/libraryAttendantModel.js";

export const validateBorrowBook = async (req, res, next) => {
  const { studentId, attendantId, returnDate } = req.body;
  if ((!studentId || !attendantId, !returnDate)) {
    return res
      .status(400)
      .json({ error: { message: "All fields are required" } });
  }

  const invalidIds = [studentId, attendantId].filter(
    (id) => !mongoose.Types.ObjectId.isValid(id),
  );
  if (invalidIds.length > 0) {
    return res.status(400).json({
      erorr: { message: `Invalid Id format ${invalidIds.join(", ")}` },
    });
  }

  const isValidBookId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValidBookId) {
    return res
      .status(400)
      .json({ error: { message: "invalid book id format" } });
  }

  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ error: { message: "Book not found" } });
  }

  if (book.status !== "IN") {
    return res
      .status(409)
      .json({ ok: false, message: "Book is currently unavailable" });
  }

  const student = await Student.findById(studentId);
  if (!student) {
    return res.status(404).json({ error: { message: "student not found" } });
  }

  const attendant = await LibraryAttendant.findById(attendantId);
  if (!attendant) {
    return res.status(404).json({ error: { message: "attendant not found" } });
  }

  req.book = book;

  next();
};
