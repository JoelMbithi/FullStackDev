import User from "../Models/userModel.js"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

// Register
export const register = async (req, res) => {
   try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
         username: req.body.username,
         email: req.body.email,
         password: hashedPassword,
         country: req.body.country
      });

      const user = await newUser.save();
      res.status(200).json(user);

   } catch (error) {
      res.status(500).json({ message: "Error registering user", error });
   }
};

// Login
export const login = async (req, res) => {
   try {
      const user = await User.findOne({ username: req.body.username });

      if (!user) {
         return res.status(403).send("User not found");
      }

      const isCorrect = await bcrypt.compare(req.body.password, user.password);

      if (!isCorrect) {
         return res.status(403).send("Invalid username or password");
      }


      //jsonwebtoken 

      const token = jwt.sign({
        id:user._id,
        isSeller: user.isSeller
      },
    process.env.JWR_KEY)

      const { password, ...others } = user._doc;

      res.cookie("accessToken",token,{
        httpOnly: true
      })
        
        .status(200).send(others);

   } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
   }
};
