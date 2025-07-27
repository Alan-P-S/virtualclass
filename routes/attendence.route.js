import express from 'express'
import { postAttendence,getAttendence,approveAttendence,denyAttendence,attendenceDashboard } from '../controller/attendence.controller.js';
import { protectRoute, isadminRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/add',protectRoute,postAttendence);

router.get('/get',protectRoute,getAttendence);

router.post('/approve',isadminRoute,approveAttendence);

router.post('/deny',isadminRoute,denyAttendence);

router.get('/dashboard', isadminRoute, attendenceDashboard);


export default router;