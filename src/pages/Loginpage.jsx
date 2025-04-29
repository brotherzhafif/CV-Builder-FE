import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "./../assets/google.png";
import RocketCharacter from "./../assets/rocket.png";
import { AuthContext } from "./../context/AuthContext";

const LoginPage = () => {
  const [form, setForm] = useState({ emailOrUsername: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://cv-api-six.vercel.app/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.emailOrUsername.includes("@") ? form.emailOrUsername : undefined,
          username: !form.emailOrUsername.includes("@") ? form.emailOrUsername : undefined,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Simpan token dan user ke localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Dispatch login action ke AuthContext
        dispatch({ type: "LOGIN", payload: data.user });

        navigate("/dashboard"); // Redirect ke dashboard
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://cv-api-six.vercel.app/auth/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Simpan token dan user ke localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Dispatch login action ke AuthContext
        dispatch({ type: "LOGIN", payload: data.user });

        navigate("/dashboard"); // Redirect ke dashboard
      } else {
        setError(data.message || "Google login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex h-screen w-full bg-white"
    >
      {/* Kiri */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center bg-[#1e88e5] relative">
        <h1 className="absolute top-10 left-10 text-white text-3xl font-bold">
          Sign In to
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
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col justify-center items-center w-full md:w-1/2 px-8 sm:px-16"
      >
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-600">
                Welcome to <span className="text-[#1e88e5] font-bold">LOREM</span>
              </p>
              <h2 className="text-3xl font-bold mt-2">Sign in</h2>
            </div>
            <div className="text-sm text-gray-500">
              <p>
                No Account?{" "}
                <a href="/signup" className="text-[#1e88e5] hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 py-2 mb-6 border rounded-lg bg-[#f5f8ff] hover:bg-[#ebefff] transition"
            disabled={loading}
          >
            <img src={GoogleIcon} alt="Google" className="w-5 h-5" />
            <span className="text-gray-700 font-medium">
              {loading ? "Signing in with Google..." : "Sign in with Google"}
            </span>
          </button>

          {/* Form Login */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Enter your email or username
              </label>
              <input
                type="text"
                name="emailOrUsername"
                value={form.emailOrUsername}
                onChange={handleChange}
                placeholder="Email or Username"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e88e5]"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Enter your Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e88e5]"
                required
              />
              <div className="text-right mt-1">
                <a href="/forgot-password" className="text-sm text-[#1e88e5] hover:underline">
                  Forgot Password
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1e88e5] hover:bg-[#1565c0] text-white font-semibold py-2 rounded-lg shadow-md transition"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {error && (
              <p className="mt-4 text-sm text-red-500 text-center">
                {error}
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;