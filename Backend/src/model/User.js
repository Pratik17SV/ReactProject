import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:''
    },
    bio:{
        type:String,
        default:''
    },
    isOnline:{
        type:Boolean,
        default:true
    },
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    friendRequests:[{
        from:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        status:{
            type:String,
            enum:['pending','accepted','declined'],
            default:'pending'
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    }],
    
},{timestamps:true})

const User = mongoose.model('User', userSchema)

export default User
