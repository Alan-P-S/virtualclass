import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoute from './routes/auth.routes.js'
import appRoute from './routes/app.route.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {connectDB} from './lib/db.js'
const __filname = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filname);
const app = express();
dotenv.config();

const port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended:true,limit:'50mb'}));


app.use('/auth',authRoute);
app.use('', appRoute);

app.listen(port,()=>{
    console.log("app has started");
    connectDB();
})