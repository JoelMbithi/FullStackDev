import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";

//create User
export const createUser = async (req,res) => {
    try {
        
        const { username, email, password, profilePic } = req.body;
        
        if(!username)
            return res.status(400).send("Username is required")
        if(!email)  
           return res.status(400).send("Email is required")
       if(!password)
         return res.status(400).send("Password is required")


     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password,salt)


        const newUser= new User({
            username: req.body.username,
            email:req.body.email,
            password:hashedPassword,
            profilePic:req.body.profilePic

        })

        const savedUser = await newUser.save();
        res.status(200).json(savedUser)

    } catch (error) {
        res.status(500).json(error)
    }
}


//getUser
export const readUser = async (req,res) => {
    try {
        const user = await User.findOne({id:req.params.id})
        if(!user)
            return res.status(400).send("User not found")

        const {password,updatedAt, ...other} = user._doc
        res.status(200).json(other)

    } catch (error) {
        res.status(500).json(error)
    }
}

//updateUser

export const updateUser = async (req,res) => {
    if(req.body.username === req.params.username || req.user.isAdmin){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt)
            } catch (error) {
                return res.status(500).json(error)
            }
        }
        try {
            const user = await User.findOneAndUpdate({username:req.params.username},{
                $set:req.body
            },{new:true})
            res.status(200).json(user)
        } catch (error) {
            return res.status(500).json(error)
        }
    }else{
        return res.status(403).json("You can update only your account")
    }
}

export const deleteRoute = async (req,res) => {
    if(req.body.username === req.params.username || req.user.isAdmin){
        try {
            await User.findOneAndDelete({username:req.params.username})
            res.status(200).json("User has been deleted")
        } catch (error) {
            return res.status(500).json(error)
        }
    }else{
        return res.status(403).json("You can delete only your account")
    }
}