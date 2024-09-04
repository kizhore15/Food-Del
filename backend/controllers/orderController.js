import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"

const stripe=new Stripe(process.env.STRIPE_KEY)


//placing users order for frontend
const placeOrder=async (req,res)=>{
    try {
        const newOrder= new orderModel({
            userId:req.body.userId,     //getting it from auth.js
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})    //clearing the cart data
        const lineItems=req.body.items.map((item)=>({
            
        }))
    } catch (error) {
        
    }
}
export {placeOrder}