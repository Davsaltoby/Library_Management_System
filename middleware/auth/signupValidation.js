import User from "../../models/userModel.js";
import Student from "../../models/studentModel.js";

const signUpValidation = async (req, res, next) => {
  const { email, password, name } = req.body;

  const emailReg = /^[^@\s\.]+@[^@\s\.]+\.[^@\s\.]+$/;

  if (!email?.trim() || !password?.trim() || !name?.trim()) {
    return res
      .status(400)
      .json({ ok: false, error: { message: "All fields are required" } });
  }

  if (!emailReg.test(email.trim())) {
    return res
      .status(400)
      .json({ ok: false, error: { message: "Invalid email format" } });
  }

  if (password.trim().length < 6) {
    return res.status(400).json({
      ok: false,
      error: { message: "Password must be at least 6 characters long" },
    });
  }

  const existingEmail = await User.findOne({ email: email.trim() });

  if (existingEmail) {
    return res
      .status(409)
      .json({ ok: false, error: { message: "this email already exists" } });
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

export default signUpValidation;
