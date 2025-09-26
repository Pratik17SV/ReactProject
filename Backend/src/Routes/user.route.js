import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getFriends, getRecommendedUsers, sendFriendRequest,acceptFriendRequest, getFriendRequests,getOutgoingFriendRequests,rejectFriendRequest} from '../controllers/user.controller.js';
import { get } from 'mongoose';


const router = express.Router();

//apply to all router bellow
router.use(protectRoute);
router.get('/', getRecommendedUsers);
router.get('/friends', getFriends);

router.post('/friend-request/:id', sendFriendRequest);
router.put('/friend-request/:id/accept',acceptFriendRequest);
router.put('/friend-request/:id/reject',rejectFriendRequest);

router.get('/friendrequests',getFriendRequests);
router.get('/friend-outgoing-requests',getOutgoingFriendRequests);

export default router;