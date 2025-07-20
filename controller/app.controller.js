import News from "../models/news.model.js";
import Exam from "../models/exam.model.js"
import Mark from "../models/mark.model.js"
import Message from "../models/message.model.js";
import Reaction from '../models/reaction.model.js';
import { isInBetween } from "../lib/currentTime.js";
import { Attendence } from "../models/attendence.model.js";
import  cloudinary  from "../lib/cloudinary.js";

export const addNews = async (req,res)=>{
    const {title,content,link} = req.body;
    try{
        if(!title || !content){
            return res.status(400).json({message:"All fields are required"});
        }
        const news = await News.findOne({title});

        if(news){
            return res.status(400).json({message:"News Already Exist"});
        }

        const newNews = new News({
            title: title,
            content:content,
            link:link
        })
        if(newNews){
            await newNews.save();
            return res.status(200).json({message:"News saved sucessfully"});
        }
        else{
            return res.status(400).json({message:"Invalid news Data"});
        }
    }
    catch(error){
        console.log("Error in updating news",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const addExam = async (req,res)=>{
    const {questions,subject} = req.body;

    if(!questions || !subject){
        return res.status(400).json({message: "All fields are Required!!"});
    }
    const newExam = new Exam({
        questions:questions,
        subject:subject
    })

    if(!newExam){
        return res.status(400).json({message:"Invalid Exam data"});
    }
    else{
        await newExam.save();
        return res.status(200).json({message: "Exam Created Successfully"});
    }

}

export const attemptExam = async (req,res)=>{
    const examId = req.query.examId;
    const userId = req.user._id;

    const  isattempted = await Mark.findOne({userId:userId,ExamId:examId});
    console.log(isattempted);
    if(isattempted){
        return res.json({message:"Exam is already Attempted"});
    }

    const exam = await Exam.findById(examId);
    return res.render('app/attempting',{exam});
}

export const postExam = async (req,res)=>{
    const user = req.user;
    const {score,examId} = req.body;
    console.log(examId);
    console.log(user._id);
    console.log(score);
    if(!examId || !user || !score){
        return res.status(500).json({message:"Invalid Values Provie all values Required"});
    }
    const newMark = new Mark({
        ExamId:examId,
        userId:user._id,
        mark:score,
    })
    if(!newMark){
        return res.status(500).json({message:"Invalid Values"});
    }
    else{
        await newMark.save();
        return res.status(500).json({message:"Exam Attempted!! Marked Saved"});
    }

    
    
}


export const classRoom = async (req,res)=>{
    const messages = await Message.find();
    const user = req.user;
    return res.render('app/class',{messages,userId:user._id});
}

export const getExams = async (req,res)=>{
    const username = req.user.name;
    const exams = await Exam.find({},'subject');

    return res.render('app/exam',{exams});
}



export const getNews = async (req,res)=>{
    const news = await News.find({},'title content link');
    const reactions = await Reaction.find({},'newsId userName reaction');
    return res.render('app/news',{news,reactions});
}

export const sendMessage = async (req,res)=>{
    const {message} = req.body;
    const user = req.user;
    try{
        if(!message || !user){
        return res.status(500).json({message:"Invalid all fields are required"});
    }

    const newMessage = new Message({
        senderId:user._id,
        senderName:user.name,
        text:message,
    })

    if(!newMessage){
        return res.status(500).json({message:"Invalid datatypes"});
    }
    else{
        await newMessage.save();
        return res.status(200).json({message:newMessage,userId:user._id});
    }
    }catch(error){
        console.log("Error in sendingMessage");
        return res.status(500).json({message:"Ineternal Server Error"});
    }
    
}


export const postAttendence = async (req,res)=>{
    const mrngAttendTime = {startTime:'05:00:00',endTime:'05:30:00'};
    const evenAttendTime = {startTime:'21:00:00',endTime:'21:30:00'};
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
            const isattend = await Attendence.findOne({userId:user._id,morning:true,date:currentTime.toDateString()});
            if(isattend){
                return res.status(200).json({message:'Already put morning Attendence'});
            }
            else{
                const uploadResponse = await cloudinary.uploader.upload(image);
                const attendence = new Attendence({
                username:user.name,
                userId:user._id,
                date:currentTime.toDateString(),
                morning:true,
                morningImage:uploadResponse.secure_url,
                })

                 await attendence.save();

                 return res.status(500).json({message:'Morning Attendence marked'});
            }
            
        }
        else{
            const isattend = await Attendence.findOne({userId:user._id,evening:true,date:currentTime.toDateString()});
            if(isattend){
                return res.status(200).json({message:'Already put Evening attendence'});
            }
            const ismrngAttend = await Attendence.findOne({userId:user._id,morning:true,date:currentTime.toDateString()});
            
            if(ismrngAttend){
                const uploadResponse = await cloudinary.uploader.upload(image);
                await Attendence.updateOne({userId:user._id,date:currentTime.toDateString()},{$set:{evening:true,eveningImage:uploadResponse.secure_url}});
                return res.status(200).json({message:'Evening Attendence also marked'});
            }else{
                const uploadResponse = await cloudinary.uploader.upload(image);
                const attendence = new Attendence({
                username:user.name,
                userId:user._id,
                date:currentTime.toDateString(),
                evening:true,
                eveningImage:uploadResponse.secure_url,
             })

            await attendence.save();

            return res.status(200).json({message:'Evening Attendence only marked'});
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

export const getAttendence = async (req,res)=>{
    res.render('app/attendence');
}

export const addReaction = async (req,res)=>{
    try{
        const {reaction,newsId} = req.body;
        const user = req.user;
        const userId = user._id;
        
        if(!reaction || !newsId || !user){
             return res.status(500).json({message:"Field values are Required"});
        }

        const isReacted = await Reaction.findOne({newsId,userId:userId});
        if(isReacted){
            await Reaction.updateOne({newsId,userId:userId},{$set:{reaction:reaction}});
            return res.status(200).json({message:"Reaction updated!"});
        }
        

        const reactionModel = new Reaction({
            newsId:newsId,
            userId:userId,
            userName:user.name,
            reaction:reaction,
        });

        await reactionModel.save();


       if(!reactionModel){
        return res.status(500).json({message:"Could not add Reaction! Invalid Data types"});
       }
       else{
        return res.status(200).json({message:"Reaction added"});
       }
       
    }
    catch(error){
        console.log("Error in Updating Reaction",error);
        return res.status(500).json({message:"Internal server Error"});
    }
    
}

