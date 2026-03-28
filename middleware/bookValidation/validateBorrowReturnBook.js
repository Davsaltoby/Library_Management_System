export const validateBorrowBook = async (req, res, next) => {
  const { borrowedBy, issuedBy } = req.body;
  if (!borrowedBy || !issuedBy) {
    return res
      .status(400)
      .json({ error: { message: "All fields are required" } });
  }

  const invalidIds = [borrowedBy, issuedBy].filter(
    (id) => !mongoose.Types.ObjectId.isValid(id),
  );
  if (invalidIds.length > 0) {
    return res.status(400).json({
      erorr: { message: `Invalid Id format ${invalidIds.join(",")}` },
    });
  }
  next();
};
