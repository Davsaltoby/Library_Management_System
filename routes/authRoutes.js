import express from "express";
import { signUp, logIn } from "../controllers/authContollers/authController.js";
import signUpValidation from "../middleware/auth/signupValidation.js";
import loginValidation from "../middleware/auth/loginValidation.js";

const router = express.Router();

router.post("/signup", signUpValidation, signUp);
router.post("/login", loginValidation, logIn);

export default router;
