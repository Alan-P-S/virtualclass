import mongoose from 'mongoose';


const AttendenceSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    username:{
        type:String,
        required:true
    },
    session:{
        type:String,
        default:'session'
    },
    status:{
        type:String,
        default:'processing'
    },
    image:{
        type:String,
        requried:true
    }
},{timestamps:true});


export const Attendence = new mongoose.model('Attendence',AttendenceSchema);