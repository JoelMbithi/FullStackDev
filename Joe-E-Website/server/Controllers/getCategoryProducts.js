import Product from "../Models/ProductModel.js"

export const getCategoryProducts = async (req,res) => {
    try {
        
        const { category } = req?.body || req?.query
        const product = await Product.find({ category })

        res.status(200).json({
            message:"Product ",
            products: product,
            success: true,
            error: false
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}