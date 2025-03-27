import express from "express";
import { createUser ,login, logout} from "../Controllers/AuthController.js";


const router = express.Router();

router.post("/create", createUser); 
router.post("/login", login); 
router.post("/logout",logout)
; 

export default router;
