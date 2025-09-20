import express from 'express';
import dotenv from 'dotenv';

import authRoute from './Routes/auth.route.js';
import friendRoute from './Routes/friend.route.js';
import { connectDB } from './lib/db.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5001; // fallback in case .env is missing

// Middleware
app.use(express.json());

app.use("/app/auth", authRoute);
app.use("/app/friends", friendRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/auth/signup`);
  console.log('Connecting to Database...');
  connectDB();
});
