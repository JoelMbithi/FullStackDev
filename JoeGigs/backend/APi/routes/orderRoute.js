import { verifyToken } from "../middleware/jwt.js";
import express from "express";
import { createOrder, getOrder} from "../controllers/orderController.js"


const router = express.Router()

router.post("/:gigId",verifyToken,createOrder)
router.get("/", verifyToken, getOrder);



export default router