import Product from "../Models/ProductModel.js"

export const getProductDetails = async (req,res)=> {
    try {
        const {productId} = req.params
        const product = await Product.findById(productId)

        res.status(200).json({
            message: "Product Details Successful fetched",
            product: product,
            success:true,
            error:false
        })

    } catch (error) {
        res.status(500).json({
            message:error?.message || error,
            error:true,
            success:false
        })
    }
}