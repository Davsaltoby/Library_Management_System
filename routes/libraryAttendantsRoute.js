import express from "express";

import {
  createLibraryAttendant,
  getLibraryAttendants,
} from "../controllers/libraryAttendantController";

const router = express.Router();

router.post("/", createLibraryAttendant);

router.get("/", getLibraryAttendants);

export default router;
