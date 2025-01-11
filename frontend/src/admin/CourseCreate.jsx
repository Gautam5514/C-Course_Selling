import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";
function CourseCreate() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    const navigate = useNavigate();

    const changePhotoHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImagePreview(reader.result);
            setImage(file);
        };
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("image", image);

        const admin = JSON.parse(localStorage.getItem("admin"));
        const token = admin.token;
        console.log(token); 
        if (!token) {
            navigate("/admin/login");
            return;
        }

        try {
            const response = await axios.post(
                `${BACKEND_URL}/course/create`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            console.log(response.data);
            toast.success(response.data.message || "Course created successfully");
            navigate("/admin/our-courses");
            setTitle("");
            setPrice("");
            setImage("");
            setDescription("");
            setImagePreview("");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.errors);
        }
    };

    return (
        <div className="min-h-screen py-10 bg-gray-50">
            <div className="max-w-4xl mx-auto p-6 bg-white border rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-8">Create Course</h3>
                <form onSubmit={handleCreateCourse} className="space-y-6">
                    <div>
                        <label className="block text-lg font-medium" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            aria-label="Course Title"
                            placeholder="Enter your course title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            aria-label="Course Description"
                            placeholder="Enter your course description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
                            rows={3}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-lg font-medium" htmlFor="price">
                            Price (in USD)
                        </label>
                        <input
                            type="number"
                            id="price"
                            aria-label="Course Price"
                            placeholder="Enter your course price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium" htmlFor="image">
                            Course Image
                        </label>
                        <div className="flex items-center justify-center my-2">
                            <img
                                src={imagePreview || "/imgPL.webp"}
                                alt="Course Preview"
                                className="max-w-full w-48 h-auto object-cover rounded-md border"
                            />
                        </div>
                        <input
                            type="file"
                            id="image"
                            aria-label="Course Image Upload"
                            accept="image/png, image/jpeg"
                            onChange={changePhotoHandler}
                            className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
                    >
                        Create Course
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CourseCreate;