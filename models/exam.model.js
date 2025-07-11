import mongoose from 'mongoose'


const ExamSchema = new mongoose.Schema({
    questions:{
        question1:{
        question:{type:String},
        option1:{type:String},
        option2:{type:String},
        option3:{type:String},
        option4:{type:String},
        correctOption:{type:String},
    },
    question2:{
        question:{type:String},
        option1:{type:String},
        option2:{type:String},
        option3:{type:String},
        option4:{type:String},
        correctOption:{type:String},
    },
    question3:{
        question:{type:String},
        option1:{type:String},
        option2:{type:String},
        option3:{type:String},
        option4:{type:String},
        correctOption:{type:String},
    },
    question4:{
        question:{type:String},
        option1:{type:String},
        option2:{type:String},
        option3:{type:String},
        option4:{type:String},
        correctOption:{type:String},
    },
    question5:{
        question:{type:String},
        option1:{type:String},
        option2:{type:String},
        option3:{type:String},
        option4:{type:String},
        correctOption:{type:String},
    },
    },
    
    subject:{
        type:String,
    },
},{timestamps:true})


const Exam = new mongoose.model("Exam",ExamSchema);

export default Exam;