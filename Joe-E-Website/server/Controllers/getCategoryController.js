import Product from "../Models/ProductModel.js";

export const getCategoryProduct = async (req, res) => {
    try {
        const productCategories = await Product.distinct("category");

        console.log("category", productCategories);

        // Array to store one product from each category
        const productsByCategory = [];

        for (const category of productCategories) {
            const product = await Product.findOne({ category: category });

            if (product) {
                productsByCategory.push(product);
            }
        }

        res.status(200).json({
            message: "Products successfully retrieved from each category",
            categories: productCategories, // Optional: send all categories too
            data: productsByCategory,
            success: true
        });

    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}