import User from "../models/Users.js"

export const updateUser = async (req,res,next) => {

    try {

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body},
            {new: true})

            res.status(200).json(updatedUser)

        
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req,res,next) => {


    try {

        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
        
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req,res,next) => {
    try {

        const User = await User.findById(req.params.id)
        const user = await User.findById(req.params.id)
        
    } catch (error) {
        next(error)
    }
}

export const getUsers = async (req,res,next) => {
    try {
        const Users = await User.find()
        res.status(200).json(Users)
    } catch (error) {
        next(error)
    }
}