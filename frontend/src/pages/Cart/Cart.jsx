import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {




  const {food_list,cartItems,removeFromCart,getTotalCartAmount,url}=useContext(StoreContext)

  const navigate = useNavigate()
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0){
            return(
              <div><div className='cart-items-title cart-items-item'>
              <img src={url+"/images/"+item.image} alt="" />
              <p>{item.name}</p>
              <p>&#8377; {item.price}</p>
              <p>{cartItems[item._id]}</p>
              <p>&#8377; {item.price*cartItems[item._id]}</p>
              <p onClick={()=>removeFromCart(item._id)} className='cross'>X</p>
            </div>
            <hr />
            </div>
              
            )
          }
        })}
      </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>&#8377; {getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery fee</p>
                <p>&#8377; {getTotalCartAmount()===0?0:30}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>&#8377; {getTotalCartAmount()===0?0:getTotalCartAmount()+30}</p>
              </div>
            </div>
            <button onClick={()=>navigate("/order")}>Proceed to checkout</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, Enter here</p>
              <div className='cart-promocode-input'>
                <input type="text" placeholder='Promo code' />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Cart