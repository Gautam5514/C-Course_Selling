import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';
const app = express();
dotenv.config();
import adminRoute from "./routes/admin.routes.js";
import courseRoute from "./routes/courses.routes.js";
import userRoute from "./routes/users.routes.js";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from "cors";


// middleware
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use(cors({
    origin: process.env.FRONTEND_URL,
    Credential: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))


// From env file
const port = process.env.PORT || 8000;
const DB_URI = process.env.MONGO_URI;

try {
    await mongoose.connect(DB_URI);
    console.log("MONGO_DB Connected");
} catch (error) {
    console.log(error);
}

// defining routes
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);

// Configuration
cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret,
});

app.get("/", (req, res) => {
    res.send("Hello Gautam");
})

app.listen(port, (err, res) => {
    console.log(`app listing on port ${port}`);
});