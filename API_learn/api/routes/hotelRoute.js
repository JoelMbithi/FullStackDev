import express from "express";
import Hotel from "../models/Hotel.js";
import { createHotel, deleteHotel, getHotels, updatedHotel } from "../controller/hotelController.js";

const router = express.Router();

//API TO CREATE hotel
router.post("/", createHotel)

/// API to Update Hotel
router.put("/:id",updatedHotel) 
//API to DELETE

router.delete("/:id",deleteHotel)

//API TO GET ALL
router.get("/:id", getHotels)
  
export default router;
