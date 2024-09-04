import React, { useContext, useEffect, useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {

    const[currentState,setCurrentState]=useState("Login")

    const {url,setToken}=useContext(StoreContext)

    //to create the state variable to save the users name,email and password
    const [data,setData]=useState({
      name:"",
      email:"",
      password:""
    })

    //take the data from the input field and save it in the state variable
    const onChangeHandler=(event)=>{
      const name=event.target.name
      const value=event.target.value
      //setting the value in state variable
      setData(data=>({...data,[name]:value}))
    }

    const onLogin=async(event)=>{
      event.preventDefault()
      let newUrl = url
      if (currentState==="Login") {
        newUrl+="/api/user/login"
        
      } else {
        newUrl+="/api/user/register"
        
      }
      const response=await axios.post(newUrl,data)
      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem("token",response.data.token)     //keys and value pair setting in local storage
        setShowLogin(false)   //to hide the login page
        
      } else {
        alert(response.data.message)
        
      }
    }

    //to check the onChangeHandler is working
    useEffect(()=>{
      console.log(data)
    },[data])

  return (
    <div className='login-popup'>
<form onSubmit={onLogin} className="login-popup-container">
  <div className="login-popup-title">
    <h2>{currentState}</h2>
    <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
  </div>
  <div className="login-popup-inputs">
    {currentState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
  </div>
  <button type='submit'>{currentState==="Sign up"?"Create account":"Login"}</button>
  <div className="login-popup-condition">
    <input type="checkbox" required />
    <p>By continuing, i agree to the terms of use & privacy policy</p>
  </div>
  {currentState==="Login"?<p>Create a new account ?<span onClick={()=>setCurrentState("Sign up")}>Click here</span></p>:
  <p>Already have an account?<span onClick={()=>setCurrentState("Login")}>Login here</span></p>}
  
  
</form>
    </div>
  )
}

export default LoginPopup