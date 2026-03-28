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

import {
  validateCreateBook,
  validateBookById,
  validateUpdateBook,
} from "../middleware/bookValidation/validateBook.js";

import { validateBorrowBook } from "../middleware/bookValidation/validateBorrowReturnBook.js";

const router = express.Router();

router.post("/", validateCreateBook, createBook);

router.get("/", getBooks);

router.get("/:id", validateBookById, getBookById);

router.put("/:id", validateBookById, validateUpdateBook, updateBook);

router.delete("/:id", validateBookById, deleteBook);

// Borrow book route

router.post("/:id/borrow", validateBorrowBook, borrowBook);

// Return book route

router.post("/:id/return", returnBook);

export default router;
