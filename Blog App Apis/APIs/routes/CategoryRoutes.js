import express from "express"
import Category from "../models/CategoryModel.js"

const router = express.Router()

//create category

router.post("/createCategory", async(req,res)=>{
    try {
        
        const newCategory = await Category({
            name:req.body.name
        })

        const category = await newCategory.save()

res.status(200).json(category)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get category

router.get("/createCategory",async(req,res)=>{
    try {
        
        const category = await Category.find()

        res.status(200).json(category)

    } catch (error) {
        res.status(500).json(error)
    }
})

export default router