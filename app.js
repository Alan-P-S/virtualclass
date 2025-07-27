import express from 'express';
import http from 'http'
import {Server} from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoute from './routes/auth.routes.js'
import appRoute from './routes/profile.route.js'
import messageRoute from './routes/message.route.js'
import attendenceRoute from './routes/attendence.route.js'
import examRoute from './routes/exam.route.js'
import newsRoute from './routes/news.route.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {connectDB} from './lib/db.js'
const __filname = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filname);
const app = express();

const server = http.createServer(app);
const io = new Server(server);

dotenv.config();

const port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended:true,limit:'50mb'}));


app.use('/auth',authRoute);
app.use('/message',messageRoute);
app.use('/exam',examRoute);
app.use('/news',newsRoute);
app.use('/attendence',attendenceRoute);
app.use('', appRoute);

server.listen(port,()=>{
    console.log("app has started");
    connectDB();
})