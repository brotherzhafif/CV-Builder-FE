import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./../assets/m-logo.png";
import profil from "./../assets/user-profile.png";

export default function NavBarDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

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
    <header className="bg-white text-[#1a6ba3] py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <a href="/dashboard" className="flex items-center gap-3">
            <img src={Logo} alt="Logo" className="mx-3 h-10 w-10" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center absolute left-28">
          <a
            href="/dashboard"
            className="block px-4 py-2 text-sm font-bold hover:text-[#2889CE] transition duration-300"
          >
            Beranda
          </a>
          <a
            href="/informasi"
            className="block px-4 py-2 text-sm font-bold hover:text-[#2889CE] transition duration-300"
          >
            Informasi
          </a>
          <a
            href="/kontak"
            className="block px-4 py-2 text-sm font-bold hover:text-[#2889CE] transition duration-300"
          >
            Kontak
          </a>
        </nav>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden absolute right-20">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#1a6ba3] focus:outline-none"
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
              className="absolute top-16 left-0 w-full bg-white rounded-b-lg shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <a
                href="/dashboard"
                className="block px-4 py-2 text-sm font-bold text-[#1a6ba3] hover:text-[#2889CE] transition duration-300"
              >
                Beranda
              </a>
              <a
                href="/informasi"
                className="block px-4 py-2 text-sm font-bold text-[#1a6ba3] hover:text-[#2889CE] transition duration-300"
              >
                Informasi
              </a>
              <a
                href="/kontak"
                className="block px-4 py-2 text-sm font-bold text-[#1a6ba3] hover:text-[#2889CE] transition duration-300"
              >
                Kontak
              </a>
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
                <p className="font-medium text-[#1a6ba3]">{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              {/* Foto Profil */}
              <img
                src={user.profileImage || profil}
                className="w-10 h-10 rounded-full border-2 border-[#1a6ba3] p-0.5 group-hover:border-[#2889CE] transition-colors"
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
                transition={{ duration: 0.3 }}
              >
                <div className="py-2">
                  <a
                    href="/UserProfile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition duration-300"
                  >
                    Profile
                  </a>
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