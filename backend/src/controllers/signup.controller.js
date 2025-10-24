import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from '../lib/utils.js'

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;

    try{
        if(!fullName.trim() || !email.trim() || !password.trim()){
            return res.status(400).json({ message: "All fields are required" });
        }

        if(password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // check if emailis valid: regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = User({ // this creates a new user instance but does not save it to the database yet.. in detail it means, it creates a new user object with the provided data
            email: email.trim().toLowerCase(),
            fullName: fullName.trim(),
            password: hashedPassword,   
        })

        if(newUser){
            const savedUser = await newUser.save() // it saves the new user to the database
            generateToken(savedUser._id, res);

            res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
            }); 
        }
        else{
            res.status(400).json({ message: "Invalid user data"})
        }
    }

    catch (error){
        console.log("Error in signup controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}