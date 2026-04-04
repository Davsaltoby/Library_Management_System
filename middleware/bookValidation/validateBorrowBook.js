import Book from "../../models/bookModel.js";
import mongoose from "mongoose";
import Student from "../../models/studentModel.js";
import LibraryAttendant from "../../models/libraryAttendantModel.js";

export const validateBorrowBook = async (req, res, next) => {
  const { studentId, attendantId, returnDate } = req.body;
  if (!studentId || !attendantId || !returnDate) {
    return res
      .status(400)
      .json({ error: { message: "All fields are required" } });
  }

  // const invalidId = !mongoose.Types.ObjectId.isValid(attendantId);
  // if (invalidId) {
  //   return res.status(400).json({
  //     erorr: { message: `Invalid Id format ${attendantId}` },
  //   });
  // }

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

  const student = await Student.findOne({ studentId: studentId });
  if (!student) {
    return res.status(404).json({ error: { message: "student not found" } });
  }

  if (book.status !== "IN" && book.borrowedBy.equals(student._id)) {
    return res.status(409).json({
      error: {
        message: `this book has already been borrowed by this student; ${student.name} with email ${student.email}`,
      },
    });
  }

  if (book.status !== "IN") {
    return res
      .status(409)
      .json({ ok: false, message: "Book is currently unavailable" });
  }

  const attendant = await LibraryAttendant.findOne({
    staffId: attendantId,
  });
  if (!attendant) {
    return res.status(404).json({ error: { message: "attendant not found" } });
  }

  const returnDateObj = new Date(returnDate);

  if (returnDateObj <= new Date()) {
    return res
      .status(400)
      .json({ erorr: { message: "return date must be a future date" } });
  }

  req.book = book;
  req.student = student;
  req.attendant = attendant;

  next();
};
