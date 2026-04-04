import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";
import bcrypt from "bcrypt";
import Student from "../../models/studentModel.js";

export const signUp = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword });

    const count = await Student.countDocuments();

    const studentIdGen = `STD-${String(count + 1).padStart(4, "0")}`;

    const newStudent = await Student.create({
      name,
      email,
      studentId: studentIdGen,
    });

    res.status(201).json({
      ok: true,
      message: `User with role: ${user.role}, created succesfully`,
      data: newStudent,
    });
  } catch (err) {
    res
      .status(500)
      .json({ ok: false, error: { message: "cannot signup at the moment" } });

    console.log(err.message);
  }
};

export const logIn = async (req, res) => {
  const user = req.user;
  try {
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30m" },
    );

    res.status(200).json({ ok: true, message: "login succesful", token });
  } catch (err) {
    res.status(500).json({ ok: false, error: { message: "cannot login" } });

    console.log(err.message);
  }
};
