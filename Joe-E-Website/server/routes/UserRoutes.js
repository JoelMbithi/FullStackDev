import express  from "express"
import { createUser, readUser, updateUser, deleteRoute } from "../Controllers/UserSignupController.js"

const router = express.Router()

router.post("/create", createUser)
router.get("/read/:username", readUser)
router.put("/update/:username", updateUser)
router.delete("/delete", deleteRoute)

export default router