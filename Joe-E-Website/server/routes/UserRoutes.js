import express from "express";
import { deleteUser } from "../Controllers/UserController.js";
import { verifyTokens } from "../middlewares/jwt.js";

const router = express.Router();

router.delete("/delete/:id",verifyTokens, deleteUser);
//router.get("/getUser/:id",getUser)

export default router;  