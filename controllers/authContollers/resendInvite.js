import User from "../../models/userModel.js";
import sendEmail from "../../config/nodeMailer.js";
import crypto from "crypto";

const resendInvite = async (req, res) => {
  const { email } = req.body;
  if (!email?.trim()) {
    return res.status(400).json({
      ok: false,
      error: { message: "Email is required" },
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
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        ok: false,
        error: { message: "User not found" },
      });
    }

    if (user.isActive) {
      return res.status(409).json({
        ok: false,
        error: { message: "Account already set up" },
      });
    }

    const inviteToken = crypto.randomBytes(32).toString("hex");
    const inviteExpiry = Date.now() + 24 * 60 * 60 * 1000;

    await user.set({ inviteToken, inviteExpiry }).save();

    const link = `${process.env.CLIENT_URL}/setup-account?token=${inviteToken}`;
    await sendEmail({
      to: email,
      subject: "Attendant Account Invitation",
      text: `Hi, here is your new setup link: ${link}. This link expires in 24 hours.`,
    });

    res.status(200).json({
      ok: true,
      message: "Invite resent successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      ok: false,
      error: { message: "Could not resend invite" },
    });
  }
};

export default resendInvite;
