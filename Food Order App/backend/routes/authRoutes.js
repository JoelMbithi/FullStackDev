import express from "express"
import {login, register } from "../controllers/auth/authControllers.js"

import multer from "multer"

const router = express.Router()
const upload = multer({ dest: "uploads/" })

router.post("/register",upload.single("image"),register)
 router.post("/login",login) 


export default router