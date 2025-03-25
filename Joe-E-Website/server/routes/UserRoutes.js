import express  from "express"
import { createUser, readUser, updateUser, deleteRoute } from "../Controllers/UserController.js"

const router = express.Router()

router.post("/create", createUser)
router.get("/read", readUser)
router.put("/update", updateUser)
router.delete("/delete", deleteRoute)

export default router