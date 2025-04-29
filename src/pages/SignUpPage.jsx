import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Tambahkan ini
import RocketCharacter from "./../assets/rocket.png";

const SignupPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Inisialisasi navigate

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://cv-api-six.vercel.app/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect ke halaman login setelah berhasil register
        navigate("/Loginpage");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white">
      {/* Kiri */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center bg-[#1e88e5] relative">
        <h1 className="absolute top-10 left-10 text-white text-3xl font-bold">
          Create Account
        </h1>
        <p className="absolute top-20 left-10 text-white text-lg">
          CV Builder is simply!
        </p>
        <img
          src={RocketCharacter}
          alt="Rocket Character"
          className="w-[400px] h-auto"
        />
      </div>

      {/* Kanan */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 sm:px-16"
      >
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-600">
                Welcome to <span className="text-[#1e88e5] font-bold">Maxy</span>
              </p>
              <h2 className="text-3xl font-bold mt-2">Sign up</h2>
            </div>
            <div className="text-sm text-gray-500">
              <p>
                Have an account?{" "}
                <a href="/Loginpage" className="text-[#1e88e5] hover:underline">
                  Sign in
                </a>
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e88e5]"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e88e5]"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e88e5]"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1e88e5] hover:bg-[#1565c0] text-white font-semibold py-2 rounded-lg shadow-md transition"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>

            {error && (
              <p className="mt-4 text-sm text-red-500 text-center">
                {error}
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;