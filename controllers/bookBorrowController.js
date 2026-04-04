const borrowBook = async (req, res) => {
  const { returnDate } = req.body;
  try {
    const bookData = {
      status: "OUT",
      borrowedBy: req.student._id,
      issuedBy: req.attendant._id,
      returnDate,
    };
    const borrowedBook = await req.book.set(bookData).save();

    await borrowedBook.populate([
      { path: "authors", select: "name bio" },
      { path: "borrowedBy", select: "name email" },
      { path: "issuedBy", select: "name staffId" },
    ]);

    res.status(200).json({
      ok: true,
      message: "your request to borrow this book is successful",
      data: borrowedBook,
    });
  } catch (err) {
    res.status(500).json({ error: { message: "Cannot borrow book" } });

    console.log(err.message);
  }
};

export default borrowBook;
