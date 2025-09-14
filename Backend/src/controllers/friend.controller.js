import User from '../model/User.js'

// Send friend request
export async function sendFriendRequest(req, res) {
    try {
        const { fromUserId, toUserId } = req.body

        // Check if users exist
        const fromUser = await User.findById(fromUserId)
        const toUser = await User.findById(toUserId)

        if (!fromUser || !toUser) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Check if already friends
        if (fromUser.friends.includes(toUserId)) {
            return res.status(400).json({ message: 'Already friends' })
        }

        // Check if request already exists
        const existingRequest = toUser.friendRequests.find(
            request => request.from.toString() === fromUserId && request.status === 'pending'
        )

        if (existingRequest) {
            return res.status(400).json({ message: 'Friend request already sent' })
        }

        // Add friend request
        toUser.friendRequests.push({
            from: fromUserId,
            status: 'pending'
        })

        await toUser.save()

        res.status(200).json({ message: 'Friend request sent successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error sending friend request', error: error.message })
    }
}

// Accept friend request
export async function acceptFriendRequest(req, res) {
    try {
        const { userId, requestId } = req.body

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Find the friend request
        const friendRequest = user.friendRequests.find(
            request => request._id.toString() === requestId
        )

        if (!friendRequest) {
            return res.status(404).json({ message: 'Friend request not found' })
        }

        if (friendRequest.status !== 'pending') {
            return res.status(400).json({ message: 'Friend request already processed' })
        }

        // Update request status
        friendRequest.status = 'accepted'

        // Add to friends list for both users
        user.friends.push(friendRequest.from)
        await user.save()

        const fromUser = await User.findById(friendRequest.from)
        if (fromUser) {
            fromUser.friends.push(userId)
            await fromUser.save()
        }

        res.status(200).json({ message: 'Friend request accepted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error accepting friend request', error: error.message })
    }
}

// Decline friend request
export async function declineFriendRequest(req, res) {
    try {
        const { userId, requestId } = req.body

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Find the friend request
        const friendRequest = user.friendRequests.find(
            request => request._id.toString() === requestId
        )

        if (!friendRequest) {
            return res.status(404).json({ message: 'Friend request not found' })
        }

        if (friendRequest.status !== 'pending') {
            return res.status(400).json({ message: 'Friend request already processed' })
        }

        // Update request status
        friendRequest.status = 'declined'

        await user.save()

        res.status(200).json({ message: 'Friend request declined successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error declining friend request', error: error.message })
    }
}

// Remove friend
export async function removeFriend(req, res) {
    try {
        const { userId, friendId } = req.body

        const user = await User.findById(userId)
        const friend = await User.findById(friendId)

        if (!user || !friend) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Remove from friends list
        user.friends = user.friends.filter(id => id.toString() !== friendId)
        friend.friends = friend.friends.filter(id => id.toString() !== userId)

        await user.save()
        await friend.save()

        res.status(200).json({ message: 'Friend removed successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error removing friend', error: error.message })
    }
}

// Get friend requests
export async function getFriendRequests(req, res) {
    try {
        const { userId } = req.params

        const user = await User.findById(userId)
            .populate('friendRequests.from', 'name email avatar isOnline')

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Filter only pending requests
        const pendingRequests = user.friendRequests.filter(
            request => request.status === 'pending'
        )

        res.status(200).json({ friendRequests: pendingRequests })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching friend requests', error: error.message })
    }
}

// Get friends list
export async function getFriends(req, res) {
    try {
        const { userId } = req.params

        const user = await User.findById(userId)
            .populate('friends', 'name email avatar isOnline')

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.status(200).json({ friends: user.friends })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching friends', error: error.message })
    }
}

// Search users (for finding friends)
export async function searchUsers(req, res) {
    try {
        const { query, userId } = req.query

        if (!query) {
            return res.status(400).json({ message: 'Search query is required' })
        }

        // Search users by name or email, excluding current user
        const users = await User.find({
            $and: [
                { _id: { $ne: userId } },
                {
                    $or: [
                        { name: { $regex: query, $options: 'i' } },
                        { email: { $regex: query, $options: 'i' } }
                    ]
                }
            ]
        }).select('name email avatar isOnline')

        res.status(200).json({ users })
    } catch (error) {
        res.status(500).json({ message: 'Error searching users', error: error.message })
    }
}
