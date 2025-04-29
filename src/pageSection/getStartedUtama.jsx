import React from "react";
import { Link } from "react-router-dom"; // Import Link dari react-router-dom
import HeroImage from "../assets/imgsatu.png"; // sesuaikan path gambar kamu

const HeroSection = () => {
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
          {/* Link untuk navigasi ke /resume */}
          <Link to="/resume">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-[63px] shadow">
              CV Builder
            </button>
          </Link>
          {/* Link untuk navigasi ke /upload */}
          <Link to="/upload">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-[63px] shadow">
              Get Your CV Score
            </button>
          </Link>
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
