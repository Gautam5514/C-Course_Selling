import { Link } from "react-router-dom";
import logo from "../../public/logo.jpg";
import { FaFacebook } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { IoLogoYoutube } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Home() {
    const [courses, setCourses] = useState([]);
    // fetch courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:3005/api/v1/course/courses"/course/courses`, {
                    withCredentials: true,
                });
                console.log(response.data.courses);
                setCourses(response.data.courses);
            } catch (error) {
                console.log("error in fetchCourses ", error);
            }
        };
        fetchCourses();
    }, []);

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        autoPlay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (

        <div className="bg-gradient-to-r from-green-400 to-blue-500 ">
            {/* Header */}

            <div className="h-screen text-white  container mx-auto">

                <header className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-2">
                        <img src={logo} alt="" className="w-10 h-10 rounded-full" />
                        <h1 className="text-2xl text-orange-500 font-bold">RK Center Cource</h1>
                    </div>
                    <div className="space-x-4">
                        <Link to={"/login"} className=" bg-transparent text-white py-2 px-4 border border-white rounded">
                            login
                        </Link>
                        <Link to={"/signup"} className=" bg-transparent text-white py-2 px-4 border border-white rounded">
                            signup
                        </Link>
                    </div>
                </header>


                {/* Section */}
                <section className="text-center py-20">
                    <h1 className="text-4xl font-semibold text-orange-300">RK Center </h1>
                    <br />

                    <p className="text-gray-500">Sharpen your skills with courses crafted by experts.</p>
                    <div className="space-x-4 mt-8">
                        <button className="bg-green-950 text-white py-3 px-6 rounded font-semibold hover:bg-white duration-300 hover:text-black">
                            Explore Courses
                        </button>
                        <button className="bg-white text-black py-3 px-6 rounded font-semibold hover:bg-green-950 duration-300 hover:text-white">
                            Courses Video
                        </button>
                    </div>
                </section>

                <section className="p-10">
                    <Slider className="" {...settings}>
                        {courses.map((course) => (
                            <div key={course._id} className="p-4">
                                <div className="relative flex-shrink-0 w-92 transition-transform duration-300 transform hover:scale-105">
                                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                                        <img
                                            className="h-32 w-full object-contain"
                                            src={course.image.url}
                                            alt=""
                                        />
                                        <div className="p-6 text-center">
                                            <h2 className="text-xl font-bold text-white">
                                                {course.title}
                                            </h2>
                                            <Link to={`/buy/${course._id}`} className="mt-8 bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-blue-500 duration-300">
                                                Enroll Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </section>


                {/* Footer */}
                <hr />
                <footer className="my-9">
                    <div className="grid grid-cols-3 md:grid-cols-3">
                        <div className="flex flex-col items-center md:items-start">
                            <div className="flex items-center space-x-2">
                                <img src={logo} alt="" className="w-10 h-10 rounded-full" />
                                <h1 className="text-2xl text-orange-200 font-bold">RK Center</h1>
                            </div>
                            <div className="mt-3 ml-2 md:ml-8">
                                <p className="mb-2">Follow us</p>
                                <div className="flex space-x-4">
                                    <a href="">
                                        <FaFacebook className="text-2xl hover:text-blue-500 duration-300" />
                                    </a>
                                    <a href="">
                                        <BiLogoInstagramAlt className="text-2xl hover:text-pink-500 duration-300" />
                                    </a>
                                    <a href="">
                                        <IoLogoYoutube className="text-2xl hover:text-red-500 duration-300" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="items-center flex flex-col">
                            <h3 className="text-lg font-semibold mb-4">Connects</h3>
                            <ul className="space-y-2 text-gray-40">
                                <li className="hover:text-white  cursor-pointer duration-300">youtube-learn semester exam</li>
                                <li className="hover:text-white cursor-pointer duration-300">telegram- get notes</li>
                                <li className="hover:text-white cursor-pointer duration-300">what s up- get stay tune</li>
                            </ul>
                        </div>
                        <div className="items-center flex flex-col">
                            <h3 className="text-lg font-semibold mb-4"><p>copyrights &copy; {new Date().getFullYear()}</p></h3>
                            <ul className="space-y-2 text-gray-40">
                                <li className="hover:text-white  cursor-pointer duration-300">Terms and Coditions</li>
                                <li className="hover:text-white cursor-pointer duration-300">Privacy Policy</li>
                                <li className="hover:text-white cursor-pointer duration-300">Refund & Cancellation</li>
                            </ul>
                        </div>
                    </div>
                </footer>

            </div>

        </div>
    )
}

export default Home
