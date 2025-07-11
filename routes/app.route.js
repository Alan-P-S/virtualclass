import express from 'express';
import { addNews, getNews, addExam, getExams, attemptExam, postExam } from '../controller/app.controller.js';
import { protectRoute, isadminRoute } from '../middleware/auth.middleware.js';


const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/exam', protectRoute, getExams);

router.get('/attempt', protectRoute, attemptExam);

router.post('/postexam', protectRoute, postExam);

router.get('/news', getNews);

router.post('/update', isadminRoute, addNews);

router.post('/addexam', isadminRoute, addExam);

router.get('/dashboard', isadminRoute, (req, res) => {
    res.render('dashboard');
});

export default router;