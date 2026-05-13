import User from "../../models/userModel.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ email: 1 });
    res.status(200).json({
      ok: true,
      message: "Users request successful",
      data: users.map((user) => ({
        userId: user._id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: { message: "cannot get users" } });
    console.error(err.message);
  }
};

export default getUsers;
