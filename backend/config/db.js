import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://myogesh23111998:Ppq7gA89rnrEHyO2@cluster0.fl1ilkk.mongodb.net/mamasKitchen")
    .then(()=>console.log('Database connected'));
    
    
}