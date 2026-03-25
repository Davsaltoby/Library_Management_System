import express from "express";

import {
  createStudent,
  getStudents,
  getStudentById,
} from "../controllers/studentsController";

const router = express.Router();

router.post("/", createStudent);

router.get("/", getStudents);

router.get("/:id", getStudentById);

export default router;
