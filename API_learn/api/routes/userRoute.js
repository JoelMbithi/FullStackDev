import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controller/userController.js"
import { verifyToken } from "../utils/verifyToken.js"


const router = express.Router()

router.get("/checkauth",verifyToken, (req,res,next) => { 
    res.send("Hello user, you are logged in")
})

//Update User
router.put("/:id", updateUser)

//Delete User

router.delete("/:id", deleteUser)

//Get user
router.get("/:id", getUser)

//Get All User

router.get("/", getUsers)


export default router