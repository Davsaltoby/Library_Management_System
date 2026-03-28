const returnBook = async (req, res) => {
  try {
    const { book, student } = req;
    const bookData = {
      status: "IN",
      borrowedBy: null,
      issuedBy: null,
      returnDate: null,
    };

    await book.set(bookData).save();

    res.status(200).json({
      ok: true,
      message: `book returned successfully by ${student.name}`,
    });
  } catch (err) {
    res.status(500).json({ error: { message: "cannot return book" } });

    console.log(err.message);
  }
};

export default returnBook;
