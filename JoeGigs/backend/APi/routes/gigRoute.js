import { verifyToken } from "../middleware/jwt.js"
import express from "express"
import { createGig, deleteGig, getGig, getGigs} from "../controllers/gigController.js"

const router = express.Router()

router.post("/createGig", verifyToken, createGig)
router.delete("/deleteGig/:id",verifyToken,deleteGig)
router.get("/singleGig/:id",verifyToken, getGig)
router.get("/getGigs",verifyToken, getGigs)

export default router;