import express from "express"
import { addToCart, allProduct, create, getCart, singleProduct, updateQuantity } from "../controllers/products/addProductController.js"
import multer from "multer"

const router = express.Router()
const upload = multer({ dest: "uploads/" })

router.post("/create",upload.single("image"),create)

router.get("/allProduct/:product_id",singleProduct)
router.get("/allProduct",allProduct)
router.post("/addToCart",addToCart)
router.get("/getCartItem",getCart)
router.post('/updateCartQuantity', updateQuantity);


export default router