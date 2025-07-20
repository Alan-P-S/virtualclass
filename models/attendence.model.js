import mongoose from 'mongoose';


const AttendenceSchema = new mongoose.Schema({
    username:{
        type:String,
        requried:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    date:{
        type:String,
        required:true
    },
    morning:{
        type:Boolean,
        default:false,
    },
    evening:{
        type:Boolean,
        default:false,
    },
    morningImage:{
        type:String,
        default:'photo'
    },
    eveningImage:{
        type:String,
        default:'photo'
    },
    eveningstatus:{
        type:String,
        default:'process'
    },
    morningstatus:{
        type:String,
        default:'process'
    }
})


export const Attendence = new mongoose.model('Attendence',AttendenceSchema);