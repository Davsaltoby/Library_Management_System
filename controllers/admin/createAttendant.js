import LibraryAttendant from "../../models/libraryAttendantModel.js";
import User from "../../models/userModel.js";
import sendEmail from "../../config/nodeMailer.js";
import crypto from "crypto";

const inviteAttendant = async (req, res) => {
  const { email, name } = req.body;
  if (!email?.trim() || !name?.trim()) {
    return res.status(400).json({
      ok: false,
      error: { message: "Email and name are required" },
    });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      ok: false,
      error: { message: "Invalid email format" },
    });
  }

  try {
    let user = await User.findOne({ email });

    if (user && user.isActive) {
      return res
        .status(409)
        .json({ ok: false, error: { message: "User already exists" } });
    }

    const inviteToken = crypto.randomBytes(32).toString("hex");
    const inviteExpiry = Date.now() + 24 * 60 * 60 * 1000;

    if (user) {
      await user.set({ inviteToken, inviteExpiry }).save();
    } else {
      user = await User.create({
        email,
        password: null,
        role: "attendant",
        isActive: false,
        inviteToken,
        inviteExpiry,
      });

      const count = await LibraryAttendant.countDocuments();
      const staffIdGen = `STF-${String(count + 1).padStart(4, "0")}`;

      await LibraryAttendant.create({
        userId: user._id,
        name,
        staffId: staffIdGen,
      });
    }

    const link = `${process.env.CLIENT_URL}/setup-account?token=${inviteToken}`;
    await sendEmail({
      to: email,
      subject: "Attendant Account Invitation",
      text: `Hi ${name}, set up your account here: ${link}. This link expires in 24 hours. If it expires, you can request a new one at ${process.env.CLIENT_URL}/resend-invite`,
    });

    res.status(200).json({
      ok: true,
      message: "Library attendant invited successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      ok: false,
      error: { message: "Could not invite library attendant" },
    });
  }
};

export default inviteAttendant;
