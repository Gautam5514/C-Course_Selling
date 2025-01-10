import express from "express";
import { buyCourses,
    courseDetail,
    createCourse, 
    deleteCourse, 
    getCourse, 
    updateCourse 
} from "../controllers/courses.controller.js";
import userMiddleware from "../middleware/user.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";


const router = express.Router();

router.post("/create", adminMiddleware ,createCourse);
router.put("/update/:courseId", adminMiddleware ,updateCourse);
router.delete("/delete/:courseId", adminMiddleware ,deleteCourse);
router.get("/courses", getCourse);
router.get(":/courseId", courseDetail);
router.post("/buy/:courseId", userMiddleware ,buyCourses);

export default router;