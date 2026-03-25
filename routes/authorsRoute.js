import express from "express";
import {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorsController";

const router = express.Router();

router.post("/", createAuthor);

router.get("/", getAuthors);

router.get("/:id", getAuthorById);

router.put("/:id", updateAuthor);

router.delete("/:id", deleteAuthor);

export default router;
