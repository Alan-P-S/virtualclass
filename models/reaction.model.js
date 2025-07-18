import mongoose from 'mongoose'


const reactionSchema = new mongoose.Schema({
    newsId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'News',
        requried:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        requried:true
    },
    userName:{
        type:String,
        required:true,
    },
    reaction:{
        type:String,
        required:true
    }
},{timestamps:true});


const Reaction  = new mongoose.model('Reaction',reactionSchema);

export default Reaction;
