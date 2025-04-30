import React, { useState, useEffect } from "react";
import logo from "./../assets/m-logo.png";
import profil from "./../assets/user-profile.png";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export function Header() {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk hamburger menu

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.href = "/LoginPage";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/LoginPage";
  };

  return (
    <header className="bg-[#2889CE] text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="mx-3 h-10 w-10" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className=" md:flex md:items-center absolute left-20 md:gap-5 hidden">
          <Link
            to="/resume"
            className="block px-4 py-2 text-sm font-bold hover:text-gray-200 transition duration-300"
          >
            CV Builder
          </Link>
          <Link
            to="/upload"
            className="block px-4 py-2 text-sm font-bold hover:text-gray-200 transition duration-300"
          >
            CV Scoring
          </Link>
          <Link
            to="/history"
            className="block px-4 py-2 text-sm font-bold hover:text-gray-200 transition duration-300"
          >
            CV History
          </Link>
        </nav>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden absolute right-20">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="absolute top-16 left-0 w-full bg-[#2889CE] rounded-b-lg shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                to="/resume"
                className="block px-4 py-2 text-sm font-bold hover:text-gray-200 transition duration-300"
              >
                CV Builder
              </Link>
              <Link
                to="/upload"
                className="block px-4 py-2 text-sm font-bold hover:text-gray-200 transition duration-300"
              >
                CV Scoring
              </Link>
              <Link
                to="/history"
                className="block px-4 py-2 text-sm font-bold hover:text-gray-200 transition duration-300"
              >
                CV History
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* User Profile */}
        <div
          className="relative flex items-center gap-4"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          {user ? (
            <div className="flex items-center gap-3 group cursor-pointer">
              {/* Nama dan Email User */}
              <div className="hidden lg:flex flex-col items-end">
                <p className="font-medium text-white">{user.username}</p>
                <p className="text-sm text-gray-200">{user.email}</p>
              </div>
              {/* Foto Profil */}
              <img
                src={user.profileImage || profil}
                className="w-10 h-10 rounded-full border-2 border-white p-0.5 group-hover:border-gray-300 transition-colors"
                alt="Profile"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
          )}

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                className="absolute right-0 mt-12 w-48 bg-white rounded-lg shadow-lg z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="py-2">
                  <Link
                    to="/UserProfile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-300"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-300"
                  >
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#2889CE] text-white py-4 text-center shadow-md">
      <div className="container mx-auto">
        <h1 className="text-xl font-bold">HACKATHON MAXY ACADEMY 2025</h1>
        <p className="text-sm mt-1 font-medium">Batch 17</p>
      </div>
    </footer>
  );
}