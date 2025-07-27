import { Attendence } from "../models/attendence.model.js";
import Mark from "../models/mark.model.js"

export const getProfile = async (req,res)=>{
    const user = req.user;
    const attendence = await Attendence.find({userId:user._id}).sort({_id:1});
    const marks = await Mark.find({userId:user._id});
    console.log(attendence);
    console.log(marks);
    res.render('app/user/profile/profile',{user:user,data:attendence,marks:marks});
};

