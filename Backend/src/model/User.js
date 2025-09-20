import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type:String, required:true },
    email: { type:String, required:true, unique:true },
    password: { type:String, required:true },
    avatar: { type:String, default:'' },
    bio: { type:String, default:'' },
    isOnborded: { type:Boolean, default:false },
    isOnline: { type:Boolean, default:true },
    friends:[{ type:mongoose.Schema.Types.ObjectId, ref:'User' }],
    friendRequests:[{
        from: { type:mongoose.Schema.Types.ObjectId, ref:'User' },
        status: { type:String, enum:['pending','accepted','declined'], default:'pending' },
        createdAt: { type:Date, default:Date.now }
    }],
},{timestamps:true});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
