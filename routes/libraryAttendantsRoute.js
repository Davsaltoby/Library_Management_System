import express from "express";

import {
  createLibraryAttendant,
  getLibraryAttendants,
} from "../controllers/libraryAttendantController.js";

import authorization from "../middleware/auth/authorization.js";

const router = express.Router();

router.post("/", authorization("admin"), createLibraryAttendant);

router.get("/", authorization("admin"), getLibraryAttendants);

export default router;
