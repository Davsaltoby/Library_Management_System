import Book from "../models/bookModel.js";

// Create Book

export const createBook = async (req, res) => {
  const bookData = { ...req.body, status: "IN" };
  try {
    await Book.create(bookData);

    const authorDetails = await Book.findOne(req.body).populate(
      "authors",
      "name bio",
    );

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

// Get Books

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .sort({ title: 1 })
      .populate("authors", "name bio");

    books.length === 0
      ? res.status(200).json({ ok: true, message: "No books available" })
      : res
          .status(200)
          .json({ ok: true, message: "Request successful", data: books });
  } catch (err) {
    res.status(500).json({ error: { message: err.message } });
    console.log(err.message);
  }
};

// Get Book By ID

export const getBookById = async (req, res) => {
  try {
    res
      .status(200)
      .json({ ok: true, message: "Request successful", data: req.book });
  } catch (err) {
    res.status(500).json({ error: { message: "cannot get book" } });
    console.log(err.message);
  }
};

// Update Book By ID

export const updateBook = async (req, res) => {
  try {
    const updatedBook = await req.book.set(req.body).save();

    res.status(200).json({
      ok: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (err) {
    res.status(500).json({ error: { message: "cannot update book" } });
    console.log(err.message);
  }
};

// Delete Book By ID

export const deleteBook = async (req, res) => {
  try {
    await req.book.deleteOne();

    res.status(200).json({ ok: true, message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: { message: "cannot delete book" } });
    console.log(err.message);
  }
};
