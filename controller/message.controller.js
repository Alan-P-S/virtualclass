import Message from "../models/message.model.js";
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

export const getMessages = async (req,res)=>{
    const messages = await Message.find();
    const user = req.user;
    return res.render('app/user/chat/chat',{messages,userId:user._id});
}