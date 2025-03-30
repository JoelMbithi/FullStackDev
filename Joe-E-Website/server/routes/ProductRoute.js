import express from "express";
import { ProductUpload,getAllProducts, updateProduct} from "../Controllers/ProductController.js";
import { verifyTokens } from "../middlewares/jwt.js";

const router = express.Router();
// Only authenticated users can access
router.post("/uploadProduct", verifyTokens, ProductUpload); 
router.get("/getProduct",getAllProducts)
router.put('/updateProduct/:id', verifyTokens, updateProduct);

export default router;
