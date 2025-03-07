import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

// REGISTER FUNCTION
export const Register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });

        await newUser.save();
        res.status(201).json({ message: "User has been created" });

    } catch (error) {
        next(error);
    }
};

// LOGIN FUNCTION
export const Login = async (req, res, next) => {
    try {
        const user = await Users.findOne({ username: req.body.username });

        if (!user) {
            return next(createError(404, "User not found"));
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordCorrect) return next(createError(400, "Wrong password or username"));

        // Generate Token
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)


    

        // Send cookie & response in ONE call
        const { password, isAdmin, ...otherDetails} = user._doc
        res
            .cookie("access_token", token, {
                httpOnly: true,
                
            })
            .status(200)
            .json({ message: "Login successful", details: {...otherDetails},isAdmin });

    } catch (error) {
        next(error);
    }
};
