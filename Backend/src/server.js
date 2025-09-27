import express from 'express';
import dotenv from 'dotenv';

import authRoute from './Routes/auth.route.js';
import userRoute from './Routes/user.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    console.error('Stream API key and secret must be provided');
}

const app = express();
dotenv.config();

const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cookieParser()); // Add cookie parser middleware

// Routes
app.use("/app/auth", authRoute);
app.use("api/user", userRoute);


// Stream setup
export const createStreamUser = async (userData) => {
    try {
        await serverClient.upsertUsers([userData]);
        console.log("Stream user created:", userData.id);
    } catch (error) {
        console.error("Error in createStreamUser:", error.message);
    }
};

export const createStreamToken = (userId) => {
    return serverClient.createToken(userId);
};

// Start server
app.listen(PORT, async () => {
  console.log(`Server running at: http://localhost:${PORT}`);
  console.log(`Signup endpoint: POST http://localhost:${PORT}/app/auth/signup`);
  console.log('Database is conecting...');
  await connectDB();
});
