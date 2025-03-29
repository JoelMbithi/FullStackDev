    import Product from "../Models/ProductModel.js";
    import User from "../Models/UserModel.js";

    // Use consistent role constants
    const ROLES = {
    ADMIN: 'admin',
    USER: 'USER'
    };

    export const ProductUpload = async (req, res) => {
        try {
            // Get the authenticated user's ID
            const sessionUserId = req.userId; 
            const { productName, price, description } = req.body;

            // Input validation
            if (!productName || !price || !description) {
                return res.status(400).json({
                    success: false,
                    message: "Name, price, and description are required",
                });
            }

            // Verify if the user is an admin
            const user = await User.findById(sessionUserId);
            if (!user || user.role !== ROLES.ADMIN) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied - Admins only",
                });
            }

            // Create the product
            const uploadProduct = new Product({
                ...req.body,
                owner: sessionUserId, // Assigning the admin as the owner
            });

            const savedProduct = await uploadProduct.save();

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

    //getProduct

  // In your product controller
export const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({
        success: true,
        data: products
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
  
  