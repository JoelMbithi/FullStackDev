import express from "express"
import { getProductDetails } from "../Controllers/getProductDetails.js"


const router = express.Router()

router.get("/getProductDetails/:productId",getProductDetails)


export default router