import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


//User login

const userLogin=async(req,res)=>{
    const {email,password}=req.body
    try {
        //To check the account is exists or not
     const user=await userModel.findOne({email})
     if (!user) {   
        return res.json({
            success:false,
            message:"User doesn't exist"
        })
        
     }
     //to check the password is matching or not  
     const match=await bcrypt.compare(password,user.password);
     if (!match) {
        return res.json({
            success:false,
            message:"Invalid password"
        })
     }
     //to generate the token
     const token = createToken(user._id);
     res.json({
        success:true,token
     })

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error"
        })
    }
    }
//creating token for the user
const createToken=(id)=>{     //taking users id
    return jwt.sign({id},process.env.JWT_TOKEN)     //using users id as data and generated the token
}

//User register

const userRegister=async(req,res)=>{
    const{name,email,password}=req.body //datas will be stored here
    try {
        //to check whether the user already exists
        const exist=await userModel.findOne({email});
        if (exist) {
            return res.json({
                success:false,
                message:"User already exists"
            })
            
        }
        //to validate email and password
        if (!validator.isEmail(email)) {
            return res.json({
                success:false,
                message:"Please enter the valid email"
            })
            
        }
        //to set the strong password
        if (password.length<8) {
            return res.json({
                success:false,
                message:"Please enter the strong password"
            })
            
        }
        //hashing user password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user=await newUser.save()  //to save the user in the database
        const token=createToken(user._id)        //taking users id and generating one token
        res.json({
            success:true,token
        })

    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Error"
        })
    }
}

export{userLogin,userRegister}