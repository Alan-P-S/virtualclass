import mongoose from 'mongoose'


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        maxlength: 60,
        requried:true,
    },
    email:{
        type:String,
        maxlength: 60,
        requried:true,
    },
    role:{
        type:String,
        maxlength:20,
        default:'user',
        required:true
    },
    password:{
        type:String,
        requried:true,
    }
})

const User = new mongoose.model("User",UserSchema);

export default User;