import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cartData:{
        type:Object,
        default:{}
    }
},{minimize:false})     //if we doesn't add false the cartData will not be created, because we did not provided any data in the cartData

//if the models is already created it will be used or if the model is not created the model will be used
const userModel=mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;