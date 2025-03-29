import User from "../Models/UserModel.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users }); 
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

//getuser

export const getCurrentUser = async (req, res) => {
    try {
        // Make sure verifyToken middleware is setting req.userId properly
        console.log("Authenticated User ID:", req.userId); // Add this for debugging
        
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized - No user ID found" });
        }

        const user = await User.findById(req.userId)
            .select('-password -refreshToken -__v');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ 
            message: "Server error fetching user",
            error: error.message 
        });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { username, bio } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { username, bio },
            { new: true, runValidators: true }
        ).select('-password -refreshToken -__v');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            updatedUser: user
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ 
            message: "Error updating profile",
            error: error.message 
        });
    }
};

export const uploadProfilePic = async (req, res) => {
    try {
        const userId = req.userId;
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const profilePicUrl = `/uploads/profile-pics/${req.file.filename}`;
        
        const user = await User.findByIdAndUpdate(
            userId,
            { profilePic: profilePicUrl },
            { new: true }
        ).select('-password -refreshToken -__v');

        res.status(200).json({
            message: "Profile picture updated successfully",
            profilePicUrl: user.profilePic
        });
    } catch (error) {
        console.error("Error uploading profile picture:", error);
        res.status(500).json({ 
            message: "Error uploading profile picture",
            error: error.message 
        });
    }
};

// Delete user function
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).send("User does not exist");
        }

        // Check if requester is the user or an admin
        if (req.userId !== user._id.toString() && !req.isAdmin) {
            return res.status(403).send("You can delete only your account!");
        }

        await User.findByIdAndDelete(req.params.id);
        
        res.status(200).send("Account deleted successfully");
        
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: error.message });
    }
};
