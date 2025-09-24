import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getFriends, getRecommendedUsers, sendFriendRequest } from '../controllers/user.controller.js';


const router = express.Router();

//apply to all router bellow
router.use(protectRoute);
router.get('/', getRecommendedUsers);
router.get('/friends', getFriends);
router.post('/friend-request/:id', sendFriendRequest);

export default router;