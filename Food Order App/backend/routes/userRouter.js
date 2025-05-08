import express  from "express"
import { deleteClient, getAllUSer, singleUser, updateClient } from "../controllers/user/userController.js"

const router = express.Router()

router.get("/singleClient/:user_id",singleUser)
router.get("/allClient",getAllUSer)
router.put("/update/:user_id",updateClient)
router.delete("/delete/:user_id",deleteClient)

export default router