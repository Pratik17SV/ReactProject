import {StreamChat} from 'stream-chat';//from package .json
import 'dotenv/config';

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    Console.error('Stream API key and secret must be provided');
}

const client = StreamChat.getInstance(apiKey, apiSecret);

export const createStreamUser = async (userData) =>{
    try {
        await upsertStreamClient.upsertUsers([userData]);//it create (insert new user data or update the data of the old user)
    } catch (error) {
        console.log('Error in createStreamUser: '+error);
    }
}
//to do later
export const createStreamToken = async(userData)=>{};