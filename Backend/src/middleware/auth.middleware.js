import jwt from 'jsonwebtoken';
import User from '../model/User.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        console.error('Error in protect middleware:', error);
        res.status(500).json({ message: 'Internal Server error' });
    }
};
