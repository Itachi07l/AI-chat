const usermodels=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

async function registerUser(req,res){
    try {
        const {fullname:{firstName,lastName},email,password}=req.body;
        const user=await usermodels.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const User=await usermodels.create({fullname:{firstName,lastName},email,password:hashedPassword});
        const token=jwt.sign({id:User._id},process.env.JWT_SECRET);
        res.cookie('token',token);
        res.status(201).json({message:"User created successfully",user:User});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

async function loginUser(req,res){
    try {
        const {email,password}=req.body;
        const user=await usermodels.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.cookie('token',token);
        res.status(200).json({message:"Login successful"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}
     

module.exports={registerUser,loginUser};





