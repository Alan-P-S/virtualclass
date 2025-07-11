import mongoose from 'mongoose'

export const connectDB = async ()=>{
    try{
       const conn = await mongoose.connect(process.env.MONGODB_URL);
       console.log(`MONGO_DB_Connected: ${conn.connection.host}`);
    }
    catch(error){
        console.log('MONGO_DB_Error: ',error);
    }
}