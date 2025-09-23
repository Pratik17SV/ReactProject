import express from 'express';
import { protectRoute } from '../middleware/auth.middleware';
import { getFriends, getRecommendedUsers } from '../controllers/user.controller.js';


const router = express.Router();

//apply to all router bellow
router.use(protectRoute);
router.get('/', getRecommendedUsers);
router.get('/friends', getFriends);


export default router;