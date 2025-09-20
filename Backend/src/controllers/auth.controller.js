// src/controllers/auth.controller.js

import User from '../model/User.js';
import jwt from 'jsonwebtoken';
import { createStreamUser, createStreamToken } from '../lib/stream.js';

// ====================== SIGNUP ======================
export async function signup(req, res) {
    const { name, email, password } = req.body;

    try {
        // --- Validation ---
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists. Please login instead.' });
        }

        // --- Create User in MongoDB ---
        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser = new User({ name, email, password, avatar: randomAvatar });
        await newUser.save();

        // --- Create User in Stream ---
        await createStreamUser({
            id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email,
            avatar: randomAvatar
        });

        // --- Tokens ---
        const jwtToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
        const streamToken = createStreamToken(newUser._id.toString());

        // --- Set Cookie + Response ---
        res.cookie('token', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict'
        });

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: newUser,
            jwt: jwtToken,
            streamToken: streamToken
        });

    } catch (error) {
        console.error("❌ Signup Error:", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// ====================== LOGIN ======================
export async function login(req, res) {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // --- Tokens ---
        const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
        const streamToken = createStreamToken(user._id.toString());

        res.cookie('token', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict'
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user,
            jwt: jwtToken,
            streamToken: streamToken
        });

    } catch (error) {
        console.error("❌ Login Error:", error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// ====================== LOGOUT ======================
export function logout(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
}
