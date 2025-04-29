import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Tambahkan useNavigate
import HeroImage from "../assets/imgsatu.png";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect ke halaman login jika token tidak ada
    } else {
      navigate(path); // Redirect ke path yang diminta
    }
  };

  return (
    <section className="flex flex-col-reverse md:flex-row items-center px-6 md:px-16 md:pl-24 py-20 md:py-32 bg-white min-h-screen">
      {/* Left Content */}
      <div className="flex flex-col items-start space-y-6 md:w-1/2">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 leading-tight">
          Create a Professional <br />
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-2 bg-yellow-300 opacity-70 -z-10 transform -rotate-2" />
          </span>
          CV in Minutes
        </h1>
        <p className="text-blue-500 text-base md:text-lg">
          Easily design a modern and professional CV in just a few minutes.
          Simple to use, fast to finish, and highly effective to impress.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => handleNavigation("/resume")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-[63px] shadow"
          >
            CV Builder
          </button>
          <button
            onClick={() => handleNavigation("/upload")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-[63px] shadow"
          >
            Get Your CV Score
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src={HeroImage}
          alt="Hero Section Illustration"
          className="w-full max-w-md"
        />
      </div>
    </section>
  );
};

export default HeroSection;