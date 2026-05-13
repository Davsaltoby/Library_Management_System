import User from "../../models/userModel.js";
import bcrypt from "bcrypt";

const setupAccount = async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password?.trim()) {
    return res.status(400).json({
      ok: false,
      error: { message: "Token and password are required" },
    });
  }

  if (password?.trim().length < 6) {
    return res.status(400).json({
      ok: false,
      error: { message: "Password must be at least 6 characters long" },
    });
  }

  try {
    const user = await User.findOne({
      inviteToken: token,
      inviteExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        ok: false,
        error: { message: "Invalid or expired token" },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await user
      .set({
        password: hashedPassword,
        inviteToken: null,
        inviteExpiry: null,
        isActive: true,
      })
      .save();

    res.status(200).json({
      ok: true,
      message: "Account setup successfully, you can now log in",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      ok: false,
      error: { message: "Could not setup account" },
    });
  }
};

export default setupAccount;
