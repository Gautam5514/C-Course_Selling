import { User } from "../models/user.models.js";
import { Course } from "../models/course.models.js";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { Purchase } from "../models/purchase.models.js";

export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const userSchema = z.object({
        firstName: z.string().min(3, { message: "fisrtName must be atleast 3 char long" }),
        lastName: z.string().min(3, { message: "lastName must be atleast 3 char long" }),
        email: z.string().email(),
        password: z.string().min(6, { message: "Password must be atleast 6 char long" }),
    })

    const validateData = userSchema.safeParse(req.body);
    if (!validateData.success) {
        return res.status(400).json({ errors: validateData.error.issues.map(err => err.message) });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({ message: "User already exist" });
        }
        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ errors: "Error in signup" });
        console.log("Error in signup", error);
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!user || !isPasswordCorrect) {
            return res.status(403).json({ errors: "Invalid credentials" });
        }

        // jwt code
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict"
        };
        res.cookie("jwt", token, cookieOptions);
        res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
        res.status(500).json({ errors: "Error in login" });
        console.log("Error in login", error);
    }
};

export const logout = (req, res) => {
    try {
        if(!req.cookies.jwt) {
            return res.status(403).json({ errors: "Kindly login first" });
        }   
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ errors: "Error in logout" });
        console.log("Error in logout", error);
    }
};

export const purchases = async (req, res) => {
    const userId = req.userId;

    try {
        const purchased = await Purchase.find({ userId });

        let purchasedCourseId = [];

        for (let i = 0; i < purchased.length; i++) {
            purchasedCourseId.push(purchased[i].courseId);
        }
        const courseData = await Course.find({
            _id: { $in: purchasedCourseId },
        });

        res.status(200).json({ purchased, courseData });
    } catch (error) {
        res.status(500).json({ errors: "Error in purchases" });
        console.log("Error in purchase", error);
    }
};