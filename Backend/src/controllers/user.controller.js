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

export async function acceptFriendRequest(req, res) {
    try {
        const { id: requestId } = req.params;

        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({ message: "Friend request not found" });
        }
        // Check if the logged-in user is the recipient of the friend request
        if (friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to accept this friend request" });
        }
        // Check if the friend request is already accepted
        if (friendRequest.status === 'accepted') {
            return res.status(400).json({ message: "This friend request has already been accepted" });
        }
        friendRequest.status = 'accepted';
        await friendRequest.save();

        // Add each user to the other's friends list
        //$addtoset is used to avoid duplicate entries (add only if not already present)
        await User.findByIdAndUpdate(friendRequest.recipient, { $addToSet: { friends: friendRequest.sender } });
        await User.findByIdAndUpdate(friendRequest.sender, { $addToSet: { friends: req.user.id } });

        res.status(200).json({ message: "Friend request accepted" });
    } 
    catch (error) {
        console.error("Error in acceptFriendRequest.controller:", error.message);
        res.status(500).json({ message: "Internet Server error" });
    }
}