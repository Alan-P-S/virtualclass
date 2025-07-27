import express from 'express'

import { loginGet,login,signup,signupGet } from '../controller/auth.controller.js';

const router = express.Router();

router.get('/login',loginGet);

router.get('/signup',signupGet);

router.post('/signup',signup);

router.post('/login',login);

export default router;