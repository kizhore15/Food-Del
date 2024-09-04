import jwt from "jsonwebtoken"

//it basically take the token and convert it in the user id, using that user id we can add, remove and get the data from the cart
const authMiddleware = async(req,res,cb)=>{
    const {token}=req.headers
    if (!token) {
        return res.json({
            success:false,
            message:"Login again"
        })
    }
    try {
        const tokenDecode = jwt.verify(token,process.env.JWT_TOKEN)
        req.body.userId=tokenDecode.id
        cb()
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Error"
        })
    }
}
export default authMiddleware