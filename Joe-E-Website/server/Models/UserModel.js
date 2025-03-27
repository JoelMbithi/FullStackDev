import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String, // Store profile picture URL
        default: ""
    },
    role: {
        type: String,
        enum: ["user", "admin"], // Restrict role values
        default: "user" // Default role is "user"
    }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
