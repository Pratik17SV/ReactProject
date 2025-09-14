import express from 'express';
import { Signup, Login, Logout } from '../controllers/auth.controller.js';   

const router = express.Router();

router.post('/Signup', Signup);
router.post('/Login', Login);
router.post('/Logout', Logout);

export default router;