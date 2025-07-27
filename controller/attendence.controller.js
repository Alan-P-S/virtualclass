import { Attendence } from "../models/attendence.model.js";
import { isInBetween } from "../lib/currentTime.js";
import  cloudinary  from "../lib/cloudinary.js";

export const postAttendence = async (req,res)=>{
    const mrngAttendTime = {startTime:'05:00:00',endTime:'05:30:00'};
    const evenAttendTime = {startTime:'21:30:00',endTime:'22:00:00'};
    const startDate = new Date();
    startDate.setHours(0,0,0,0);
    const endDate = new Date();
    endDate.setHours(23,59,59,999);
    const currentTime = new Date();
    const { image } = req.body;
    const user = req.user;
    try{
    if(isInBetween(mrngAttendTime.startTime,mrngAttendTime.endTime,currentTime) || isInBetween(evenAttendTime.startTime,evenAttendTime.endTime,currentTime)){
        if(!image){
             return res.status(500).json({message:'Image file is required'});
        }
        const ismrng = isInBetween(mrngAttendTime.startTime,mrngAttendTime.endTime,currentTime);
        if(ismrng){
            const isattend = await Attendence.findOne({userId:user._id,session:"morning",createdAt:{$gte: startDate,$lte: endDate}});

            if(isattend){
                return res.status(200).json({message:'Already put morning Attendence'});
            }
            else{
                const uploadResponse = await cloudinary.uploader.upload(image);
                const attendence = new Attendence({
                userId:user._id,
                username:user.name,
                session:'morning',
                image:uploadResponse.secure_url,
                })

                 await attendence.save();

                 return res.status(500).json({message:'Morning Attendence marked'});
            }
            
        }
        else{
            const isattend = await Attendence.findOne({userId:user._id,session:"evening",createdAt:{$gte: new Date(new Date().setHours(0,0,0,0)),$lte: new Date(new Date().setHours(23,59,59,999))}});
            if(isattend){
                return res.status(200).json({message:'Already put Evening attendence'});
            }
            else{
                const uploadResponse = await cloudinary.uploader.upload(image);
                const attendence = new Attendence({
                userId:user._id,
                username:user.name,
                session:'evening',
                image:uploadResponse.secure_url,
             })

            await attendence.save();

            return res.status(200).json({message:'Evening Attendence marked'});
            }
            
        }

    }
    else{
        return res.status(500).json({message:'Cannot Mark Attendence in AnyTime'});
    }
    }
    catch(error){
        console.log("Error in Attendence",error);
        return res.status(500).json({message:'Internal server error'});
    }
}

export const approveAttendence = async (req,res)=>{
    const {attendenceId} = req.body;
    if(!attendenceId){
        return res.status(500).json({message:"Field value missing"});
    }
    const attendence = await Attendence.findByIdAndUpdate(attendenceId,{status:'approved'}); 
    return res.status(200).json({message:'Attendence approved'});
}

export const denyAttendence = async (req,res)=>{
    const {attendenceId} = req.body;
    if(!attendenceId){
        return res.status(500).json({message:"Field value missing"});
    }
    const attendence = await Attendence.findByIdAndUpdate(attendenceId,{status:'denied'}); 
    return res.status(200).json({message:'Attendence Denied'});


}

export const attendenceDashboard = async (req,res)=>{
    const attendence = await Attendence.find({status:'processing'});
    if(attendence){
        res.render('app/admin/attendencedashboard',{datas:attendence});
    }
}

export const getAttendence = async (req,res)=>{
    res.render('app/user/attendence/attendence');
}