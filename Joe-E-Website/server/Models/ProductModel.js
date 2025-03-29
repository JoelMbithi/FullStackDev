import mongoose from "mongoose";

const ProductModel = new mongoose.Schema({
 
    productName: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    productImages: {
        type: [String], // Store image URLs as an array of strings
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    selling: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Product", ProductModel);
