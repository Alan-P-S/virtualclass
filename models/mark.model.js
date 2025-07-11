import mongoose from 'mongoose'
import User from './users.model.js'
import Exam from './exam.model.js'

const MarkSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    ExamId:{type:mongoose.Schema.Types.ObjectId,
        ref:'Exam',
    },
    mark:{
        type:String,
        required: true,
    }
});


const Mark = new mongoose.model('Mark',MarkSchema);

export default Mark;