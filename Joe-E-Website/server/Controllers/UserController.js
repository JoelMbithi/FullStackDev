import User from "../Models/UserModel.js";


//create User
export const createUser = async (req,res) => {
    try {
        
        const newUser= new User({
            username: req.body.username,
            email:req.body.email,
            password:req.body.password
        })

        const savedUser = await newUser.save();
        res.status(200).json(savedUser)

    } catch (error) {
        res.status(500).json(error)
    }
}



export const readUser = async (req,res) => {}

export const updateUser = async (req,res) => {}
export const deleteRoute = async (req,res) => {}