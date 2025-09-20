import { StreamChat } from 'stream-chat';
import 'dotenv/config';

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    console.error('Stream API key and secret must be provided');
}

const client = StreamChat.getInstance(apiKey, apiSecret);

export const createStreamUser = async (userData) => {
    try {
        console.log('Creating Stream user:', userData);
        await client.upsertUsers([userData]);
        console.log('Stream user created successfully');
        return { success: true };
    } catch (error) {
        console.error('Error in createStreamUser:', error);
        throw error;
    }
};

export const createStreamToken = (userId) => {
    try {
        const token = client.createToken(userId);
        console.log('Stream token created for user:', userId);
        return token;
    } catch (error) {
        console.error('Error creating Stream token:', error);
        throw error;
    }
};