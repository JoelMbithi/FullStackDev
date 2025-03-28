import User from "../Models/UserModel.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users }); 
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
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
