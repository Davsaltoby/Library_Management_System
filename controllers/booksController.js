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

// Get Paginated Books with Search Query functionality

export const getBooks = async (req, res) => {
  const { search } = req.query;
  let { page = 1, limit = 5 } = req.query;

  page = Number(page);
  limit = Number(limit);
  const skip = (page - 1) * limit;

  try {
    const books = await Book.find()
      .sort({ createdAt: -1 })
      .populate("authors", "name bio");

    const queriedBooks = search
      ? books.filter(
          (book) =>
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.authors.some((author) =>
              author.name.toLowerCase().includes(search.toLowerCase()),
            ),
        )
      : books;

    res.status(200).json({
      ok: true,
      message:
        queriedBooks.length === 0 ? "No books available" : "Request successful",
      data: queriedBooks.slice(skip, skip + limit),
    });
  } catch (err) {
    res.status(500).json({ error: { message: err.message } });
    console.log(err.message);
  }
};

// Get Book By ID

export const getBookById = async (req, res) => {
  try {
    if (req.book.status === "OUT") {
      const bookOut = await req.book.populate([
        { path: "authors", select: "name bio" },
        { path: "borrowedBy", select: "name email" },
        { path: "issuedBy", select: "name staffId" },
      ]);

      return res
        .status(200)
        .json({ ok: true, message: "request successful", data: bookOut });
    }
    res
      .status(200)
      .json({ ok: true, message: "request successful", data: req.book });
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
