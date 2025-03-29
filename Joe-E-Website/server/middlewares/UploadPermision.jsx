//Product Upload - Admin Only
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
    }
