import express from "express"
import { createRooms, deleteRoom, getRoom, getRooms, updateRooms } from "../controller/roomController.js"
import { verifyAdmin } from "../utils/verifyToken.js"


const router = express.Router()

//API to create a new room

router.post("/:hotelId", verifyAdmin,createRooms)

//API to Update rooms
router.put("/:id",verifyAdmin,updateRooms)

//API to delete Room 
router.delete("/id", verifyAdmin,deleteRoom )

//API to Get Rooms
router.get("/:id", verifyAdmin,getRoom)

//API to get All Rooms

router.get("/",verifyAdmin, getRooms)


export default router