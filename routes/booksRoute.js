import express from "express";

import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/booksController.js";

import borrowBook from "../controllers/bookBorrowController.js";

import returnBook from "../controllers/bookReturnController.js";

const router = express.Router();

router.post("/", createBook);

router.get("/", getBooks);

router.get("/:id", getBookById);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

// Borrow book route

router.post("/:id/borrow", borrowBook);

// Return book route

router.post("/:id/return", returnBook);

export default router;
