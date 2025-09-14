import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        const con =await mongoose.connect(process.env.MONGO_KEY);
        console.log('Mongodb connected :',con.connection.host);
    }catch(err){
        console.log('Mongodb connection failed');
        console.log(err.message);
        process.exit(1);//1 means Failure
    }
}
