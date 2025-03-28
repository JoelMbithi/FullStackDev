import express from "express";
import { deleteUser,getUsers } from "../Controllers/UserController.js";
import { verifyTokens } from "../middlewares/jwt.js";

const router = express.Router();

router.delete("/delete/:id",verifyTokens, deleteUser);
router.get("/getUsers",getUsers)

export default router;  