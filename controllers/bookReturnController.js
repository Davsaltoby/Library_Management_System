const returnBook = async (req, res) => {
  try {
    const { book, student } = req;

    const isOverdue =
      book.borrowedBy.equals(student._id) &&
      new Date(book.returnDate) < new Date();

    const bookData = {
      status: "IN",
      borrowedBy: null,
      issuedBy: null,
      returnDate: null,
    };

    await book.set(bookData).save();

    //Book return overdue logic

    res.status(200).json({
      ok: true,
      message: `book returned successfully by ${student.name}`,
      warning: isOverdue ? "book return is overdue" : "",
    });
  } catch (err) {
    res.status(500).json({ error: { message: "cannot return book" } });

    console.log(err.message);
  }
};

export default returnBook;
