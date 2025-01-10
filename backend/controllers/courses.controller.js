import { Course } from "../models/course.models.js";
import { v2 as cloudinary } from 'cloudinary';
import { Purchase } from "../models/purchase.models.js";


export const createCourse = async (req, res) => {
    const adminId = req.adminId
    const { title, description, price } = req.body;

    try {
        if(!title || !description || !price ) {
            return res.status(400).json({ errors: "All fields are required." });
        }

        const {image} = req.files
        if(!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ errors: "No!.. is required." });
        }
        
        const allowedFormats = ["image/png", "image/jpeg"]
        if(!allowedFormats.includes(image.mimetype)) {
            return res.status(400).json({errors: "Invalid file format, Only png or jpg are allowed."});
        }

        // cloudinary setup code
        const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
        if(!cloud_response || cloud_response.error) {
            return res.status(400).json({errors: "Error uploading image of cloudinary."});
        }
        const courseData = {
            title,
            description,
            price,
            image:{
                public_id: cloud_response.public_id,
                url: cloud_response.url,
            },
            creatorId:adminId
        };
        const course = await Course.create(courseData);
        res.json({
            message: "Course created Successfully",
            course,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error creating course" });
    }
};

export const updateCourse = async (req, res) => { 
    const adminId = req.adminId;
    const { courseId } = req.params;
    const { title, description, price, image } = req.body;
    try {
        const courseSearch = await Course.findOne(courseId);
        if(!courseSearch) {
            res.status(404).json({ errors: "Course not found" });    
        }
        const course = await Course.updateOne(
            {
                _id: courseId,
                creatorId: adminId,
            },
            {
                title,
                description,
                price,
                image: {
                    public_id: image?.public_id,
                    url: image?.url,
                },
            }
        );
        res.status(200).json({ message: "Course updated successfully", course });
    } catch (error) {
        res.status(500).json({ error: "Error updating course" });
        console.log("Error is course updating", error);
    }
};

export const deleteCourse = async (req, res) => {
    const adminId = req.adminId
    const { courseId } = req.params;
    try {
        const course = await Course.findOneAndDelete({
            _id: courseId,
            creatorId: adminId,
        })
        if(!course) {
            return res.status(404).json({ errors: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ errors: "Error deleting course" });
        console.log("Error deleting course", error);
    }
};

export const getCourse = async (req, res) => {
    try {
        const courses = await Course.find({})
            res.status(201).json({ courses })
    } catch (error) {
        res.status(500).json({errors: "Error in getting courses"});
        console.log("Error getting course", error);
    }
};

export const courseDetail = async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({errors: "Course not found"});
        }
        res.status(200).json({course});
    } catch (error) {
        res.status(500).json({errors: "Error getting course detail"});
        console.log("Error getting course detail", error);
    }
};

export const buyCourses = async (req, red) => {
    const { userId } = req;
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({ errors: "Course not found" });
        }
        const existingPurchase = await Purchase.findOne({userId, courseId});
        if(!existingPurchase){
            res.status(400).json({ errors: "User has already purchased this course" });
        }

        const newPurchase = new Purchase({ userId, courseId });
        await newPurchase.save();
        res.status(201).json({ message: "Course purchased successfully", newPurchase });
    } catch (error) {
        console.log("error in course buying", error);
    }
};