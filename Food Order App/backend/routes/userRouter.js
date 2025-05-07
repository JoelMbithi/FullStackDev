import express  from "express"
import { getAllUSer, singleUser } from "../controllers/user/userController.js"

const router = express.Router()

router.get("/singleClient/:user_id",singleUser)
router.get("/allClient",getAllUSer)

export default router