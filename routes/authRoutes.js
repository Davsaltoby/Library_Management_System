import express from "express";
import { signUp, logIn } from "../controllers/authContollers/authController.js";
import signUpValidation from "../middleware/auth/signupValidation.js";
import loginValidation from "../middleware/auth/loginValidation.js";
import setupAccount from "../controllers/authContollers/setupAccount.js";
import resendInvite from "../controllers/authContollers/resendInvite.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const resendInviteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    ok: false,
    error: { message: "Too many requests, please try again later" },
  },
});

router.post("/signup", signUpValidation, signUp);
router.post("/login", loginValidation, logIn);
router.post("/setup-account", setupAccount);
router.post("/resend-invite", resendInviteLimiter, resendInvite);

export default router;
