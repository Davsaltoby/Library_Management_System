import express from "express";

import {
  createStudent,
  getStudents,
  getStudentById,
} from "../controllers/studentsController.js";

import validateStudent from "../middleware/studentValidation/validateStudent.js";

import authorization from "../middleware/auth/authorization.js";

const router = express.Router();

router.post("/", authorization("admin"), validateStudent, createStudent);

router.get("/", getStudents);

router.get("/:id", getStudentById);

export default router;
