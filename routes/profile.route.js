import express from 'express';
import { getProfile} from '../controller/profile.controller.js';
import { protectRoute, isadminRoute } from '../middleware/auth.middleware.js';


const router = express.Router();

router.get('/', (req, res) => {
    res.render('app/index');
});

router.get('/profile', protectRoute, getProfile);

router.get('/dashboard', isadminRoute, (req, res) => {
    res.render('app/admin/admindashboard');
});

export default router;