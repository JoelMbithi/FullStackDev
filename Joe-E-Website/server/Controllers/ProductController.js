import Product from "../Models/ProductModel.js";
import User from "../Models/UserModel.js";

// Use consistent role constants
const ROLES = {
  ADMIN: "admin",
  USER: "USER",
};

// Product Upload
export const ProductUpload = async (req, res) => {
  try {
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
      owner: sessionUserId,
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

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Product Update
export const updateProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const sessionUserId = req.userId;

    // Input validation
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Admin verification
    const user = await User.findById(sessionUserId);
    if (!user || user.role !== ROLES.ADMIN) {
      return res.status(403).json({
        success: false,
        message: "Access denied - Admin privileges required",
      });
    }

    // Prepare update data
    const updateData = {
      ...req.body,
      ...(req.body.price && { price: Number(req.body.price) }),
      ...(req.body.sellingPrice && { sellingPrice: Number(req.body.sellingPrice) }),
    };

    // Perform update
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    console.error("Update product error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
  }