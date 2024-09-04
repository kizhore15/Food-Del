import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{


    //toggling cart items
    const[cartItems,setCartItems]=useState({})
    const url="http://localhost:4000"
    const [token,setToken]=useState("")
    //fetching card data from backend
    const [food_list,setFoodList]=useState([])

    
    const addToCart =async(itemId)=>{

        //adding products  in the cart,  key id is itemId
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        // if the products are already there in the cart it will add with that products
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    //removing items from the cart
    const removeFromCart=async(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    //calculation of total and subtotal
    const getTotalCartAmount= ()=>{
        let totalAmount=0
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo= food_list.find((product)=>product._id===item)
            totalAmount+= itemInfo.price* cartItems[item];
            }
            
        }
        return totalAmount;
    }
    //fetching card data from the data base
    const fetchFoodList = async()=>{
        const response=await axios.get(url+"/api/food/list")
        setFoodList(response.data.data)
    }

    //to set the same qty of the product in the cart when it reloaded
    const loadCartData=async (token)=>{
        const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData)
    }

    
    useEffect(()=>{
        
        //whenever the page gets reloaded the card datas have to load data
        async function loadData(){
            await fetchFoodList()

              //Not to logout function
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData()
    },[])


    const contextValue = {
        food_list,cartItems,setCartItems,addToCart,removeFromCart,getTotalCartAmount,url,token,setToken

    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider