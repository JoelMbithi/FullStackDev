 import express from "express"
import { Register } from "../controller/authController.js"


 const router =express.Router()

//API to Create a new user
 router.post("/register", Register)
 
 export default router