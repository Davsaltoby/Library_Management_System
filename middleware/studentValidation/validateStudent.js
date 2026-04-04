import Student from "../../models/studentModel.js";

const validateStudent = async (req, res, next) => {
  const { name, email } = req.body;

  const emailReg = /^[^@\s\.]+@[^@\s\.]+\.[^@\s\.]+$/;

  if (!name?.trim() || !email?.trim()) {
    return res.status(400).json({
      ok: false,
      error: { message: "Please provide a valid name and email" },
    });
  }
  if (!emailReg.test(email.trim())) {
    return res
      .status(400)
      .json({ ok: false, error: { message: "Invalid email format" } });
  }

  const studentName = await Student.findOne({ name: name });

  if (studentName) {
    return res.status(409).json({
      ok: false,
      error: { message: `Name: ${studentName.name}, already exists` },
    });
  }

  const studentEmail = await Student.findOne({ email: email });

  if (studentEmail) {
    return res.status(409).json({
      ok: false,
      error: { message: `Email: ${studentEmail.email}, already exists` },
    });
  }
  next();
};

export default validateStudent;
