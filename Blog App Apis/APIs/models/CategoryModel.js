import { Schema, model } from "mongoose"

const CategorySchema =  Schema({
    name:{
        type:String,
        required:true
    }
},{timestamps:true})

export default model("Category",CategorySchema)