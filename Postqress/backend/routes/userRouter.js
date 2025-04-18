import express from "express"
import { createUser, deleteClient, getClients, UpdateClient } from "../controllers/userController.js"

const router = express.Router()

router.post("/createUser",createUser)
router.get("/getClients", getClients)
router.put("/updateClient/:id",UpdateClient)
router.delete("/deleteClient/:id",deleteClient)


export default router