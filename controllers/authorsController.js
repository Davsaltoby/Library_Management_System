import Author from "../models/authorModel.js";

// Create Authors

export const createAuthor = async (req, res) => {
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

  const author = await Author.create({ name, bio });

  res.status(201).json({ message: "Author successfully created", author });
};

// Get Authors

export const getAuthors = async (req, res) => {
  const authors = await Author.find().sort({ name: 1 });
  if (authors.length === 0) {
    return res.status(200).json({ message: "No authors found" });
  }

  res.status(200).json(authors);
};

// Get author by Id

export const getAuthorById = async (req, res) => {
  const id = req.params.id;

  try {
    const author = await Author.findById(id);
    if (!author) {
      return res.status(404).json({
        error: {
          message: "cannot find author",
        },
      });
    }

    res.status(200).json(author);
  } catch (err) {
    res.status(400).json({
      error: {
        message: "Invalid author id",
        details: err.message,
      },
    });
  }
};

// Update author

export const updateAuthor = async (req, res) => {
  const id = req.params.id;
  const { name, bio } = req.body;

  if (!name || !name.trim() || !bio) {
    return res
      .status(400)
      .json({ error: { message: "All fields are required" } });
  }
  try {
    const author = await Author.findById(id);
    if (!author) {
      return res.status(404).json({
        error: {
          message: "cannot find author",
        },
      });
    }

    author.name = name;
    author.bio = bio;

    await author.save();
    res.status(200).json({
      message: "Author updated successfully",
      author,
    });
  } catch (err) {
    res.status(400).json({
      error: {
        message: "Invalid author id",
        details: err.message,
      },
    });

    console.log(err);
  }
};

// Delete author

export const deleteAuthor = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedAuthor = await Author.findByIdAndDelete(id);
    if (!deletedAuthor) {
      return res.status(404).json({
        error: {
          message: "cannot find author",
        },
      });
    } else {
      res.status(200).json({
        message: `Author: ${deletedAuthor.name}, has been deleted successfully`,
      });
    }

    res.status(200).json({ message: "Author deleted successfully" });
  } catch (err) {
    res.status(400).json({
      error: {
        message: "Invalid author id",
        details: err.message,
      },
    });
  }
};
