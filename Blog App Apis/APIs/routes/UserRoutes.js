import express from "express"
import User from "../models/UserModel.js"
import Post from "../models/PostModel.js"
import bcrypt from "bcrypt"

const router = express.Router()

//Update User

router.put("/update/:id", async(req,res)=> {

    try {

        if(req.body.password){
            const salt= await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body},

           { $new:true}
        )
        res.status(200).json(updatedUser)
        
    } catch (error) {
        res.status(500).jason(error)
    }

})

//Delete User
router.delete("/delete/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        if (String(req.body.id) !== String(req.params.id)) {
            return res.status(403).json({ message: "You can only delete your own account" });
        }

        await Post.deleteMany({ username: user.username });

        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Account has been deleted successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
});

//Get User

router.get("/get/:id", async(req,res) => {
    try {

        const user = await User.findById(req.params.id)
        const { password,...others}  = user._doc

        res.status(200).json(others)
        
    } catch (error) {
        res.status(403).json(error)
    }
})

export default router