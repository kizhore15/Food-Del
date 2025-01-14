import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
//app config
const app = express()
const port = 4000

//middleware
app.use(express.json())     //whenever we will get the request from the frontend to backend that will be parsed using this command
app.use(cors())     //we can access the backend from any frontend

//database connection
connectDB()

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads"))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("ApI working")
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})
