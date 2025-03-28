import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded

// Create User
export const createUser = async (req, res) => {
    try {
        const { username, email, password, profilePic, role } = req.body;

        if (!username || !email || !password)
            return res.status(400).json({ error: "All fields are required" });

        const normalizedEmail = email.toLowerCase();
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser)
            return res.status(400).json({ error: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        let userRole = role === "admin" ? "admin" : "user"; // Allow admin creation

        const newUser = new User({
            username,
            email: normalizedEmail,
            password: hashedPassword,
            profilePic,
            role: userRole
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: "Email and password are required" });

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) return res.status(404).json({ error: "User not found" });

        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) return res.status(403).json({ error: "Wrong credentials" });

        // Generate token securely
        let token;
        try {
            token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        } catch (jwtError) {
            return res.status(500).json({ error: "Token generation failed" });
        }

        const { password: _, ...others } = user._doc;

        // Secure cookie settings
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/"
        });

        res.status(200).json(others);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//get roles 

export const getRoles = async(req,res)=>{
    try {
        const roles = ["user","admin"]

        res.status(200).json({roles})
    } catch (error) {
        res.status(500).json(error)
    }
}

//update Role

export const updateRole = async (req,res)=>{
    try {
        
        const { userId, newRole } = req.body

        //ensure user is database

        if(!userId || !newRole)
            return res.status(400).send("User is not available")

        //find user and update role

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {role: newRole},
            { new: true}
        )
        res.status(200).json({
            message:"User Role Updated successfully",
            user: updatedUser
        })

    } catch (error) {
        res.status(500).json(error)
    }
}

//logout
export const logout = (req, res) => {
    res.clearCookie("accessToken", {
       httpOnly: true,
       secure: process.env.NODE_ENV === "production",
       sameSite: "None"
    })
    .status(200)
    .json({ message: "Logout successful" });
 };