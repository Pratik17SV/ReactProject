import User from "../model/User.js";
import FriendRequest from "../model/FriendRequest.js";


export async function getRecommendedUsers(req, res) {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUser = await User.find({
           $and: [
            { _id: { $ne: currentUserId } },
            { _id: { $nin: currentUser.friends } },
            { isOnboarded: true }
           ] 
        })
        res.status(200).json({ users: recommendedUser });
    } catch (error) {
       console.error("Error in getRecommendedUsers:", error.message); 
       res.status(500).json({ message: "Internet Server error" });
    }
}

export async function getFriends(req, res) {
    try {
        const user = await User.findById(req.user.id)
        .select('friends')
        .populate('friends', 'name email');
        
        res.status(200).json({ friends: user.friends });
    }
    catch (error) {
        console.error("Error in getFriends:", error.message);
        res.status(500).json({ message: "Internet Server error" });
    }
}

export async function sendFriendRequest(req, res) {
    try {
        const myid = req.user.id;
        const {id: recipientId} = req.params;

        //check if user is sending request to himself
        if (myid === recipientId) {
            return res.status(400).json({ message: "You cannot send friend request to yourself" });
        }

        //check if recipient user exists
        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({ message: "Recipient user not found" });
        }

        //check if they are already friends
        if (recipient.friends.includes(myid)) {
            return res.status(400).json({ message: "You are already friends with this user" });
        }

        //check if a friend request is already sent
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myid, recipient: recipientId },
                { sender: recipientId, recipient: myid }
            ],
        });

        // If a request already exists, return an error
        if (existingRequest) {
            return res.status(400).json({ message: "A friend request is already pending between you and this user" });
        }

        // Create a new friend request
        const friendRequest = new FriendRequest({
            sender: myid,
            recipient: recipientId,
        });

        await friendRequest.save();
        res.status(201).json(friendRequest);
    } catch (error) {
        console.error("Error in sending sendFriendRequest.controller:", error.message);
        res.status(500).json({ message: "Internet Server error" });
    }
}