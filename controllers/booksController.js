import Book from "../models/bookModel.js";

export const createBook = async (req, res) => {
  const bookData = { ...req.body, status: "IN" };
  try {
    await Book.create(bookData);

    const authorDetails = await Book.find().populate("authors", "name bio");

    res.status(201).json({
      ok: true,
      message: "Book successfully created",
      data: authorDetails,
    });
  } catch (err) {
    res.status(500).json({ error: { message: "cannot create book" } });
    console.log(err.message);
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .sort({ title: 1 })
      .populate("authors", "name bio");
    res
      .status(200)
      .json({ ok: true, message: "Request successful", data: books });
  } catch (err) {
    res.status(500).json({ error: { message: err.message } });
  }
};

export const getBookById = (req, res) => {};

export const updateBook = (req, res) => {};

export const deleteBook = (req, res) => {};
