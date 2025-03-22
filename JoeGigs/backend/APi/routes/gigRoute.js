import { verifyToken } from "../middleware/jwt.js";
import express from "express";
import { createGig, deleteGig, getGig, getGigs, getUserGigs } from "../controllers/gigController.js";

const router = express.Router();

router.post("/createGig", verifyToken, createGig);
router.delete("/deleteGig/:id", verifyToken, deleteGig);
router.get("/singleGig/:id", getGig);
router.get("/getGigs", getGigs);
router.get("/user/:id", getUserGigs); // ✅ Added route for fetching user gigs

export default router;
