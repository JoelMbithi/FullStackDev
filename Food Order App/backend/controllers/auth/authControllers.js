import db from "../../utils/db.js"
import { generateToken } from "../../utils/jwt.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    const { name, email, password, imageUrl, country, confirmPassword, role, phone } = req.body;
    let finalImageUrl = null;
    
    try {
      // Check if user exists
      const user = await db.query(`SELECT * FROM client WHERE email=$1`, [email]);
  
      if (user.rows.length > 0) {
        return res.status(400).json({
          message: "User already exists",
          success: false,
        });
      }
  
      // Password validation
      if (password !== confirmPassword) {
        return res.status(400).json({
          message: "Passwords do not match",
          success: false,
        });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Set default user role if not provided
      const userRole = role === 'admin' ? 'admin' : 'user';
  
      // Image upload logic
      if (req.file) {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: 'FoodApp',
        });
        finalImageUrl = result.secure_url; // Set the image URL from Cloudinary
      } else if (imageUrl) {
        finalImageUrl = imageUrl; // Use the image URL from the frontend
      }
  
      // Insert new user into the database
      const result = await db.query(
        `INSERT INTO client (name,email,password, role,image,country,phone) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
        [name, email, hashedPassword, userRole, finalImageUrl, country, phone]
      );
  
      const newUser = result.rows[0];
      const token = generateToken({ userId: newUser.user_id });
  
      res.status(201).json({
        message: "User successfully created",
        user: {
          id: newUser.user_id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          country: newUser.country,
          phone: newUser.phone,
          image: newUser.image,
        },
        token,
        success: true,
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({
        message: "Error registering user",
        success: false,
      });
    }
  };
  



/* login */
export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await db.query(`SELECT * FROM client WHERE email = $1`, [email]);
  
      if (user.rows.length === 0) {
        return res.status(400).json({
          message: "User not found",
          success: false,
        });
      }
  
      const loginUser = user.rows[0];
  
      const isMatch = await bcrypt.compare(password, loginUser.password);
      if (!isMatch) {
        return res.status(403).json({
          message: "Invalid password",
          success: false,
        });
      }
  
      const token = generateToken({ userId: loginUser.user_id });
  
      // Remove password before sending user object
      delete loginUser.password;
  
      res.status(200).json({
        message: "Login successful",
        user: loginUser,  // returns full user object except password
        token,
        success: true,
      });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({
        message: "Error logging in",
        success: false,
      });
    }
  };
  