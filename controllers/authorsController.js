import Author from "../models/authorModel.js";

// Create Authors

export const createAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);

    res
      .status(201)
      .json({ ok: true, message: "author successfully created", author });
  } catch (err) {
    res
      .status(500)
      .json({ ok: false, error: { message: "cannot create author" } });

    console.log(err.message);
  }
};

// Get Authors

export const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find().sort({ name: 1 });

    res.status(200).json({
      ok: true,
      message: authors.length === 0 ? "No authors found" : "request successful",
      data: authors,
    });
  } catch (err) {
    res
      .status(500)
      .json({ ok: false, error: { message: "cannot get authors" } });

    console.log(err.message);
  }
};

// Get author by Id

export const getAuthorById = async (req, res) => {
  try {
    res.status(200).json(req.author);
  } catch (err) {
    res
      .status(500)
      .json({ ok: false, error: { message: "cannot get author" } });

    console.log(err.message);
  }
};

// Update author

export const updateAuthor = async (req, res) => {
  try {
    const author = req.author;

    const { name, bio } = req.body;

    await author.set({ name, bio }).save();
    res.status(200).json({
      message: "author updated successfully",
      author,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: {
        message: "cannot update author",
      },
    });

    console.log(err.message);
  }
};

// Delete author

export const deleteAuthor = async (req, res) => {
  const author = req.author;

  try {
    await author.deleteOne();

    res
      .status(200)
      .json({ ok: true, message: `author has been deleted successfully` });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: {
        message: "cannot delete author",
      },
    });

    console.log(err.message);
  }
};
