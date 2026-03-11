import userModel from "../Models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from "validator"

//login user
const loginuser=async (req,res)=>{
   const {email,password}=req.body;
   try {
    const user=await userModel.findOne({email});

    if(!user){
        return res.json({success:false,message:"user doesn't exist"})
    }

    //if user matched then match will password
    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch){
        return res.json({success:false,message:"Invalid password"})
    }

    const token=createToken(user._id)
    res.json({success:true,token})
   } catch (error) {
    console.log(error)
    res.json({success:false,message:"error"})
   }
}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register
const registeruser=async (req,res)=>{
   const {name,email,password}=req.body;

   try {
    //check user is already exists or not
    const exist=await userModel.findOne({email})
    if(exist){
      return res.json({success:false,message:"User already exists"});
    }
    //valid email or not
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"pls enter a valid password"})
    }

    if(password.length<8){
        return res.json({success:false,message:"pls enter a strong password"})
    }

    //hashing user password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);


    const newUser=new userModel({
        name:name,
        email:email,
        password:hashedPassword
    })

    const user=await newUser.save();
    const token=createToken(user._id)

    res.json({success:true,token});  
    
   } catch (error) {
    console.log(error)
      res.json({success:false,message:"erorr"})
   }
}

export {loginuser,registeruser};