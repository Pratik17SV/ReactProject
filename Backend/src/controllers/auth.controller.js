import User from '../model/User.js';
import jwt from 'jsonwebtoken';

export async function Signup(req, res) {
    const {name, email, password} = req.body;
    try {
        if(!name || !email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }

        if(password.length < 6) {
            return res.status(400).json({message: 'Password must be at least 6 characters long'});
        }
        //got it online to get the email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)) {
            return res.status(400).json({message: 'Invalid email format'});
        }

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: 'Email already exists use different email'});
        }

        const idx = Math.floor(Math.random() * 100)+1;//generate a random number between 1 and 100.
        const randomAvater = 'https://avater.iran.liara.run/public/'+idx;

        const newUser = new User({name, email, password, avatar:randomAvater});

        try {
            await upsertStreamUser({
            id:newUser._id.toString,
            name:newUser.name,
            email:newUser.email,
            avatar:randomAvater||""
            });
            console.log('Stream is created for user: '+newUser.name);
        } catch (error) {
            console.log('Error in createStreamUser: '+error);
        }



        //To DO: Create a same user in stream chat
        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true, //prevent xss attack (cross site scripting)
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict'//prevents CSRF attack (cross site request forgery)
        });

        res.status(201).json({message: 'User created successfully', user: newUser});
    } catch (error) {
        console.log('Error in Signup: '+error);
        res.status(500).json({message: 'Internal server error'});
    }
    res.send('Signup route working');
}

export async function Login(req, res) {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({message: 'Invalid email or password'});
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch) {
            return res.status(401).json({message: 'Invalid password'});
        }

        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true, //prevent xss attack (cross site scripting)
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict'//prevents CSRF attack (cross site request forgery)
        });

        res.status(200).json({success: true,user});
    } catch (error) {
        console.log('Error in Login: '+error);
        res.status(500).json({message: 'Internal server error'});
    }
}

export function Logout(req, res) {
    //res.send('Logout route working');
    res.clearCookie('token');
    res.status(200).json({message: 'Logout successful'});
}