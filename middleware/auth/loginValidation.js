import User from "../../models/userModel.js";
import bcrypt from "bcrypt";

const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    return res
      .status(400)
      .json({ ok: false, error: { message: "all fields are required" } });
  }

  const user = await User.findOne({ email: email.trim() });

  if (!user) {
    return res
      .status(404)
      .json({ ok: false, error: { message: "invalid credentials" } });
  }

  const isValidPassword = await bcrypt.compare(password.trim(), user.password);

  if (!isValidPassword) {
    return res
      .status(401)
      .json({ ok: false, error: { message: "invalid credentials" } });
  }

  req.user = user;

  next();
};

export default loginValidation;
