import Product from "../Models/ProductModel.js";
import User from "../Models/UserModel.js";
import multer from 'multer';
import path from 'path';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Use consistent role constants
const ROLES = {
  ADMIN: "admin",
  USER: "USER",
};

// Product Upload with Image Handling
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

    // Handle image upload
    let productImages = [];
    if (req.file) {
      productImages.push({
        url: `/uploads/${req.file.filename}`,
        filename: req.file.filename
      });
    }

    // Create the product
    const uploadProduct = new Product({
      ...req.body,
      productImages,
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

// Get all products (unchanged)
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

// Product Update with Image Handling
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

    // Handle image update if new file is uploaded
    let productImages = product.productImages;
    if (req.file) {
      // In production, you would delete the old image file here
      productImages = [{
        url: `/uploads/${req.file.filename}`,
        filename: req.file.filename
      }];
    }

    // Prepare update data
    const updateData = {
      ...req.body,
      productImages,
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
};