import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    content:{
        type:String,
        requried:true,
        maxlength:500
    },
    link:{
        type:String,
        require:true,
    }
})

const News = mongoose.model("News",newsSchema);

export default News;