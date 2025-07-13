import { generateToken } from "../lib/util.js";
import User from '../models/users.model.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import e from "express";

export const loginGet = async (req,res)=>{
        const token = req.cookies.token;
        if(token){
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            if(!decode){
            return res.render('auth/login');
            }
            const user = await User.findById(decode.userId).select('-password');
            if(user.role=="admin"){
                return res.redirect('/dashboard');
            }
            return res.render('auth/profile',{user});
        }
        else{
            return res.render('auth/login');
        } 
        
}

export const signupGet = (req,res)=>{
    res.render('auth/signup');
}

export const login = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }
        else{
            generateToken(user._id,res);
            res.status(200).json({
                id:user._id,
                username:user.name,
                email:user.email,
            })
        }
    } catch (error) {
        console.log("Error in Login: ",error.message);
        res.status(500).json({message:"Internal server error: "})
    }
}

export const signup = async (req,res)=>{
    const {username,password,email} = req.body;
    try {
        if(!username || !password || !email){
            return res.status(400).json({message:"All fields are Required"});
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password should be at least 6 characters"});
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({message:"User already Exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            name:username,
            email:email,
            password:hasedPassword,
        })

        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save();

            res.status(200).json({
                _id:newUser._id,
                username:newUser.name,
                email:newUser.email,
            })
        }else{
            res.status(400).json({message:"Invalid user Data"});
        }


    } catch (error) {
        console.log("Error in signup controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

