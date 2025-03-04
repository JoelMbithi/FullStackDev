import express from "express";
import Hotel from "../models/Hotel.js";
import { countByCity, countByType, createHotel, deleteHotel,getHotel, getHotels, updatedHotel } from "../controller/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js"


const router = express.Router();

//API TO CREATE hotel
router.post("/",verifyAdmin, createHotel)

/// API to Update Hotel
router.put("/:id",verifyAdmin,updatedHotel) 
//API to DELETE

router.delete("/",verifyAdmin, deleteHotel)

//API tu get hotels
router.get("/", getHotels);
//API TO GET ALL
router.get("/find/:id", getHotel)

router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
  
export default router;
