import Users from "../models/Users.js"

export const Register = async (req,res,next) => {
    try {
        const newUser = new Users({
            username:req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        await newUser.save()
        res.status(200).send("User has been created")
        
    } catch (error) {
        next(error)
    }
}