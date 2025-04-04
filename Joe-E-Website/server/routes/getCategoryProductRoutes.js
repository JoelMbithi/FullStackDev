import express from "express"
import { getCategoryProducts } from "../Controllers/getCategoryProducts.js"

const router = express.Router()

router.post("/getAllProduct",getCategoryProducts)


export default router