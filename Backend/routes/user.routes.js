import express from "express";
import upload from "../middleware/upload.js";
import {
  createUser,
  deleteUser,
  exportUsersToCSV,
  getUserById,
  getUsers,
  updateUser,
  updateUserStatus,
} from "../controllers/user.controller.js";

const router = express.Router();

// User CRUD Routes
router.post("/", upload.single("profileImage"), createUser);
router.get("/", getUsers);
router.get("/export", exportUsersToCSV);
router.get("/:id", getUserById);
router.put("/:id", upload.single("profileImage"), updateUser);
router.patch("/:id/status", updateUserStatus);
router.delete("/:id", deleteUser);

export default router;
