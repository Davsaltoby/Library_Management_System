import express from "express";

import {
  createLibraryAttendant,
  getLibraryAttendants,
} from "../controllers/libraryAttendantController.js";

const router = express.Router();

router.post("/", createLibraryAttendant);

router.get("/", getLibraryAttendants);

export default router;
