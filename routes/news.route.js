import express from 'express'
import { addReaction,addNews,getNews } from '../controller/news.controller.js';
import { protectRoute, isadminRoute } from '../middleware/auth.middleware.js';
const router = express.Router();


router.get('/getnews', protectRoute, getNews);

router.post('/addreaction',protectRoute,addReaction);

router.post('/updatenews', isadminRoute, addNews);

export default router;