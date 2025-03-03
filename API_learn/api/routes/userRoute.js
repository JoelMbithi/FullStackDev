import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controller/userController.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"

const router = express.Router()
/*
 // Route to check if a user is authenticated
router.get("/checkAuthentication", verifyToken, (req, res, next) => { 
    res.send("Hello user, you are logged in")
})

// Route to check if a user is authorized (authenticated user with matching ID or admin)
router.get("/checkUser/:id", verifyUser, (req, res, next) => {
    res.send("Hello user, you are logged in. Now you can delete the account")
})

// Route to check if an admin is authenticated
router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
    res.send("Hello admin, you are logged in and now you can delete all the accounts")
})
*/


// Route to UPDATE user details
router.put("/:id", verifyUser, updateUser)

// Route to DELETE a user
router.delete("/:id",verifyUser, deleteUser)

// Route to fetch details of a specific user
router.get("/:id",verifyUser, getUser)

// Route to fetch details of all users
router.get("/",verifyAdmin, getUsers)

export default router
