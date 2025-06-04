import express from "express"
import { getAllRevenue, getSingleRevenue, revenue } from "../controllers/revenue/Revenue.js"

const router = express.Router()

router.post("/create",revenue)
router.get("/getAllRevenue",getAllRevenue)
router.get("/getSingleRevenue",getSingleRevenue)

export default router