import express from "express";
import { ProductUpload,getAllProducts} from "../Controllers/ProductController.js";
import { verifyTokens } from "../middlewares/jwt.js";

const router = express.Router();
// Only authenticated users can access
router.post("/uploadProduct", verifyTokens, ProductUpload); 
router.get("/getProduct",getAllProducts)

export default router;
