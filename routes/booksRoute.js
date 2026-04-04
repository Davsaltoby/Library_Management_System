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
import authorization from "../middleware/auth/authorization.js";

import {
  validateCreateBook,
  validateBookById,
  validateUpdateBook,
} from "../middleware/bookValidation/validateBook.js";

import { validateBorrowBook } from "../middleware/bookValidation/validateBorrowBook.js";

import validateReturnBook from "../middleware/bookValidation/validateReturnBook.js";

const router = express.Router();

router.get("/", getBooks);

router.get("/:id", validateBookById, getBookById);

router.post(
  "/",
  authorization("admin", "attendant"),
  validateCreateBook,
  createBook,
);

router.put(
  "/:id",
  authorization("admin", "attendant"),
  validateBookById,
  validateUpdateBook,
  updateBook,
);

router.delete(
  "/:id",
  authorization("admin", "attendant"),
  validateBookById,
  deleteBook,
);

// Borrow book route

router.post(
  "/:id/borrow",
  authorization("student"),
  validateBorrowBook,
  borrowBook,
);

// Return book route

router.post(
  "/:id/return",
  authorization("student"),
  validateReturnBook,
  returnBook,
);

export default router;
