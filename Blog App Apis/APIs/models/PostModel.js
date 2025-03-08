import { Schema, model } from "mongoose"


const PhotoSchema = Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
    },
    photos:{
        type:String,
        required:false
    },
    username:{
        type:String,
        required:true,
    },
    category:{
        type:Array,
        required:false
    },
},
{timestamps:true}
)

export default model("Photos", PhotoSchema)
