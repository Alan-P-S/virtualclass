import News from "../models/news.model.js";
import Reaction from '../models/reaction.model.js';


export const getNews = async (req,res)=>{
    const news = await News.find({},'title content link');
    const reactions = await Reaction.find({},'newsId userName reaction');
    return res.render('app/user/news/news',{news,reactions});
}


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