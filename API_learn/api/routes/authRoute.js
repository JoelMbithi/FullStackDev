 import express from "express"
import { Login, Register } from "../controller/authController.js"


 const router =express.Router()

//API to Create a new user
 router.post("/register", Register)
 router.post("/login",Login)
 export default router