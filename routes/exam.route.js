import express from 'express'
import { attemptExam,postExam,getExams,addExam } from '../controller/exam.controller.js';
import { protectRoute, isadminRoute } from '../middleware/auth.middleware.js';
const router = express.Router();

router.get('/attempt', protectRoute, attemptExam);

router.post('/submit', protectRoute, postExam);

router.get('/get', protectRoute, getExams);

router.post('/create', isadminRoute, addExam);

export default router;