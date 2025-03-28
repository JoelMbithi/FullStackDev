import express from "express";
import { createUser, getRoles, login, logout, updateRole } from "../Controllers/AuthController.js";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", login);
router.get("/roles", getRoles);
router.put("/updateRole", updateRole);
router.post("/logout", logout);

export default router;
