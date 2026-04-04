import mongoose from "mongoose";
import Author from "../../models/authorModel.js";

export const validateCreateAuthor = async (req, res, next) => {
  const { name, bio } = req.body;

  if (!name || !bio || !name.trim()) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const authorName = await Author.findOne({ name: name });

  if (authorName) {
    return res
      .status(400)
      .json({ error: { message: `${authorName.name} already exists` } });
  }

  next();
};

export const validateAuthorById = async (req, res, next) => {
  const invalidId = !mongoose.isValidObjectId(req.params.id);

  if (invalidId) {
    return res.status(400).json({
      ok: false,
      error: {
        message: "Invalid author id",
      },
    });
  }

  const author = await Author.findById(req.params.id);
  if (!author) {
    return res.status(404).json({
      ok: false,
      error: {
        message: "cannot find author",
      },
    });
  }

  req.author = author;

  next();
};

export const validateUpdateAuthor = (req, res, next) => {
  const { name, bio } = req.body;

  if (!name || !name.trim() || !bio) {
    return res
      .status(400)
      .json({ error: { message: "All fields are required" } });
  }

  next();
};
