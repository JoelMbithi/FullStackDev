import express from "express"
import { getAllOrder, getOrder, order } from "../controllers/Orders/OrderController.js"
import { deleteClient, updateClient } from "../controllers/user/userController.js"

const router = express.Router()

router.post ("/create",order)
router.get("/getOrder/:order_id",getOrder)
router.get("/orders",getAllOrder)
router.put("/update",updateClient)
router.delete("/delete",deleteClient)

export default router