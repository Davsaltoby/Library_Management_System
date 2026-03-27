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
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({
        error: {
          message: "cannot find author",
        },
      });
    }

    req.author = author;

    next();
  } catch (err) {
    res.status(400).json({
      error: {
        message: "Invalid author id",
        details: err.message,
      },
    });
  }
};
