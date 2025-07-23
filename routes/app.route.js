import express from 'express';
import { addNews, getNews, addExam, getExams, attemptExam, postExam,classRoom,sendMessage,addReaction,postAttendence,getAttendence,getProfile,attendenceDashboard,  approveAttendence , denyAttendence} from '../controller/app.controller.js';
import { protectRoute, isadminRoute } from '../middleware/auth.middleware.js';


const router = express.Router();

router.get('/', (req, res) => {
    res.render('app/index');
});

router.get('/exam', protectRoute, getExams);
router.get('/profile', protectRoute, getProfile);

router.get('/attempt', protectRoute, attemptExam);

router.post('/postexam', protectRoute, postExam);

router.post('/attendence',protectRoute,postAttendence);

router.get('/attendence',protectRoute,getAttendence);

router.get('/news', getNews);

router.get('/class',protectRoute,classRoom);

router.post('/reaction',protectRoute,addReaction);

router.post('/update', isadminRoute, addNews);

router.post('/addexam', isadminRoute, addExam);

router.post('/approveattendence',isadminRoute,approveAttendence);

router.post('/denyattendence',isadminRoute,denyAttendence);

router.get('/attendencedashboard', isadminRoute, attendenceDashboard);

router.post('/sendmessage',protectRoute,sendMessage);

router.get('/dashboard', isadminRoute, (req, res) => {
    res.render('app/dashboard');
});

export default router;