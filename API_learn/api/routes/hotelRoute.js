import express from "express";
import Hotel from "../models/Hotel.js";
import { createHotel, deleteHotel, getHotels, updatedHotel } from "../controller/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js"


const router = express.Router();

//API TO CREATE hotel
router.post("/",verifyAdmin, createHotel)

/// API to Update Hotel
router.put("/:id",verifyAdmin,updatedHotel) 
//API to DELETE

router.delete("/",verifyAdmin,deleteHotel)

//API TO GET ALL
router.get("/:id", getHotels)
  
export default router;
