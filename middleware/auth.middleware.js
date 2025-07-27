import jwt from 'jsonwebtoken';
import User from '../models/users.model.js';

export const protectRoute = async (req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Unauthorized - No token provided"});
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET);

        if(!decode){
            return res.status(401).json({message:"Unauthorized - Invaild token"});
        }
        const user = await User.findById(decode.userId).select('-password');

        if(!user){
            return res.status(401).json({message:"User not Found!!"});
        }
        req.user = user;

        next();
    }
    catch(error){
        console.log("Error in protectedRoute middleware: ",error.message);
        res.status(500).json({message:"Internal server error"});
    }
};

export const isadminRoute = async (req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Unauthorized - No token provided"});
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET);

        if(!decode){
            return res.status(401).json({message:"Unauthorized - Invaild token"});
        }

        const user = await User.findById(decode.userId).select('-password');
        if(!user){
            return res.status(401).json({message:"User not Found!!"});
        }
        if(user.role == "admin"){
            req.user = user;
            next();
        }
        else{
            return res.status(401).json({message:"Access Denied."});
        }

        
    }
    catch(error){
        console.log("Error in isadminRoute middleware: ",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}
