import express from 'express';
import { 
    sendFriendRequest, 
    acceptFriendRequest, 
    declineFriendRequest, 
    removeFriend, 
    getFriendRequests, 
    getFriends, 
    searchUsers 
} from '../controllers/friend.controller.js';

const router = express.Router();

// Send friend request
router.post('/send-request', sendFriendRequest);

// Accept friend request
router.post('/accept-request', acceptFriendRequest);

// Decline friend request
router.post('/decline-request', declineFriendRequest);

// Remove friend
router.post('/remove', removeFriend);

// Get friend requests for a user
router.get('/requests/:userId', getFriendRequests);

// Get friends list for a user
router.get('/list/:userId', getFriends);

// Search users
router.get('/search', searchUsers);

export default router;
