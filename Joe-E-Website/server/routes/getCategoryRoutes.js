import express from "express"
import { getCategoryProduct } from "../Controllers/getCategoryController.js"


const router = express.Router()

router.get("/productCategory",getCategoryProduct)

export default router