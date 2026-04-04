import express from "express";
import {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorsController.js";

import {
  validateUpdateAuthor,
  validateCreateAuthor,
  validateAuthorById,
} from "../middleware/authorValidation/authorValidation.js";

import authorization from "../middleware/auth/authorization.js";

const router = express.Router();

router.get("/", getAuthors);

router.use(authorization("admin", "attendant"));

router.post("/", validateCreateAuthor, createAuthor);

router.get("/:id", validateAuthorById, getAuthorById);

router.put("/:id", validateAuthorById, validateUpdateAuthor, updateAuthor);

router.delete("/:id", validateAuthorById, deleteAuthor);

export default router;
