import express from "express";
import {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorsController.js";

import {
  validateCreateAuthor,
  validateAuthorById,
} from "../middleware/authorValidation/authorValidation.js";

const router = express.Router();

router.post("/", validateCreateAuthor, createAuthor);

router.get("/", getAuthors);

router.get("/:id", validateAuthorById, getAuthorById);

router.put("/:id", updateAuthor);

router.delete("/:id", deleteAuthor);

export default router;
