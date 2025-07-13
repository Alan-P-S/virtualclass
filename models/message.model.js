import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        requried:true
    },
    senderName:{
        type:String,
        requried:true,
    },
    text:{
        type:String,
    }

},{timestamps:true});

const Message = new mongoose.model("Message",MessageSchema);

export default Message;