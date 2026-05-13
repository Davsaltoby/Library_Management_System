import express from "express";
import authorization from "../../middleware/auth/authorization.js";
import inviteAttendant from "../../controllers/admin/createAttendant.js";
import getUsers from "../../controllers/admin/getUsers.js";

const router = express.Router();

router.use(authorization("admin"));

router.post("/register/attendants", inviteAttendant);
router.get("/users", getUsers);

export default router;
