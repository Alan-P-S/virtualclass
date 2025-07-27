import express from 'express'
import { getMessages,sendMessage } from '../controller/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router =express.Router();

router.post('/send',protectRoute,sendMessage);

router.get('/chat',protectRoute,getMessages);

export default router;


