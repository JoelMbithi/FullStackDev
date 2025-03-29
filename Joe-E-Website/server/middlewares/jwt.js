import jwt from "jsonwebtoken"
import User from "../Models/UserModel.js"
export const verifyTokens = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ error: "You are not authenticated" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(403).json({ error: "Token is not valid" });
        }
        req.userId = payload.id; 
        req.isAdmin = payload.role === "admin";
        next();
    });
};

const ROLES = {
    ADMIN: "admin",
    USER: "USER",
  };
  
  export const UploadProductPermission = async (userId) => {
      try {
          const user = await User.findById(userId);
          return user?.role === ROLES.ADMIN;
      } catch (error) {
          console.error("Permission check error:", error);
          return false;
      }
  };
  
  // Product Upload - Admin Only
  export const ProductUpload = async (req, res) => {
      try {
          const { productName, price, description } = req.body;
  
          // Input validation
          if (!productName || !price || !description) {
              return res.status(400).json({
                  success: false,
                  message: "Name, price, and description are required",
              });
          }
  
          // Verify if user is an admin
          const isAdmin = await UploadProductPermission(req.userId);
          if (!isAdmin) {
              return res.status(403).json({
                  success: false,
                  message: "Access denied - Admins only",
              });
          }
  
          // Create product
          const newProduct = new ProductModel({
              ...req.body,
              owner: req.userId, // Admin is the product owner
          });
  
          const savedProduct = await newProduct.save();
  
          res.status(201).json({
              success: true,
              message: "Product successfully uploaded",
              data: savedProduct,
          });
      } catch (error) {
          console.error("Product upload error:", error);
          res.status(500).json({
              success: false,
              message: error.message || "Failed to upload product",
          });
      }
  };
  



