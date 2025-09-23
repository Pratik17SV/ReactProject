

export async function getRecommendedUsers(req, res) {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUser = await User.find({
           $and: [
            { _id: { $ne: currentUserId } },
            { _id: { $nin: currentUser.friends } },
            { isOnborded: true }
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
    }
    catch (error) {}
}