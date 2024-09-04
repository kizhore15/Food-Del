import userModel from "../models/userModel.js"

//add items to user cart
const addToCart=async(req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId) //userid should be same as req.body.userid that will be get it middleware
        let cartData=await userData.cartData
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId]=1
        } else {
            cartData[req.body.itemId]+=1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({
            success:true,
            message:"Added to cart"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Error"
        })
    }
}
// //remove items from user cart
// const removeFromCart=async(req,res)=>{
//     try {
//         let userData=await userModel.findById(req.body.userId)
//         let cartData=await userData.cartData
//         if (cartData[req.body.itemId>0]) {
//             cartData[req.body.itemId]-=1

//         }
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData})
//         res.json({
//             success:true,
//             message:"Removed from cart"
//         })
//     } catch (error) {
//         console.log(error)
//         res.json({
//             success:false,
//             message:"Error"
//         })
//     }
// }

const removeFromCart = async (req, res) => {
    try {
        // Fetch user data by userId from the request body
        let userData = await userModel.findById(req.body.userId);

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Fetch the cart data from the user data
        let cartData = userData.cartData;

        // Check if the item exists in the cart and has a quantity greater than 0
        if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;

            // If the item quantity becomes 0, remove the item from the cart
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }

            // Update the user's cart data in the database
            await userModel.findByIdAndUpdate(req.body.userId, { cartData });

            // Respond with success message
            return res.json({
                success: true,
                message: "Removed from cart"
            });
        } else {
            // Respond with a message indicating the item is not in the cart
            return res.json({
                success: false,
                message: "Item not found in cart"
            });
        }
    } catch (error) {
        console.log(error);

        // Respond with an error message
        return res.status(500).json({
            success: false,
            message: "Error"
        });
    }
};

//fetch user cart datas
const getCart=async(req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId)
        let cartData=await userData.cartData
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Error"
        })
    }
}

export{addToCart,removeFromCart,getCart}