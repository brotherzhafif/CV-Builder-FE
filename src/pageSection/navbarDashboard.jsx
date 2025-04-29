import { useMediaQuery } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Logo from "./../assets/m-logo.png";

export default function NavBarDashboard() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [activeLink, setActiveLink] = useState(window.location.pathname);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.href = "/LoginPage";
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkStyle = (path) => {
    const baseColor = "text-[#2889CE]";
    const activeColor = activeLink === path ? "text-[#1a6ba3]" : "";
    return `${baseColor} ${activeColor} hover:text-[#1a6ba3] transition-colors duration-200`;
  };

  return (
    <div className="relative">
      {isMobile ? (
        <motion.header
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-0 z-50 flex items-center justify-between w-full px-4 py-3 bg-white shadow-md transition-all duration-300 ${
            isScrolled ? "bg-white shadow-md" : ""
          }`}
        >
          {/* Logo Mobile - Diposisikan lebih ke kanan */}
          <div className="ml-4 w-[120px]">
            <a href="/dashboard">
              <img
                src={Logo}
                alt="Logo"
                className="h-[40px] w-auto object-contain"
              />
            </a>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              className="p-2 rounded-lg hover:bg-blue-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-[#2889CE]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {!isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                )}
              </svg>
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className="absolute right-0 z-50 w-full py-4 mt-3 bg-white rounded-lg shadow-md"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex flex-col gap-2 px-4">
                    <a
                      href="/dashboard"
                      className={`px-4 py-2 rounded-lg ${navLinkStyle("/dashboard")}`}
                    >
                      Beranda
                    </a>
                    <a
                      href="/informasi"
                      className={`px-4 py-2 rounded-lg ${navLinkStyle("/informasi")}`}
                    >
                      Informasi
                    </a>
                    <a
                      href="/kontak"
                      className={`px-4 py-2 rounded-lg ${navLinkStyle("/kontak")}`}
                    >
                      Kontak
                    </a>
                    <div className="px-4 py-2 mt-4 border-t border-gray-100">
                      {user && (
                        <a
                          href="/UserProfile"
                          className="flex items-center gap-3"
                        >
                          <img
                            src={user.profileImage || "https://via.placeholder.com/40"}
                            className="w-8 h-8 rounded-full"
                            alt="Profile"
                          />
                          <div>
                            <p className="font-medium text-[#2889CE]">{user.username}</p>
                            <p className="text-sm text-[#1a6ba3]">{user.email}</p>
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      ) : (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full h-[80px] px-8 transition-all duration-300 ${
            isScrolled ? "bg-white shadow-md" : ""
          }`}
        >
          {/* Logo Desktop - Diposisikan lebih ke kanan */}
          <div className="ml-14 w-[200px]">
            <a href="/dashboard">
              <img
                src={Logo}
                alt="Logo"
                className="h-[45px] w-auto object-contain"
              />
            </a>
          </div>

          <div className="flex gap-8 items-center">
            <a href="/dashboard" className={`px-4 py-2 ${navLinkStyle("/dashboard")}`}>
              Beranda
            </a>
            <a href="/informasi" className={`px-4 py-2 ${navLinkStyle("/informasi")}`}>
              Informasi
            </a>
            <a href="/kontak" className={`px-4 py-2 ${navLinkStyle("/kontak")}`}>
              Kontak
            </a>
          </div>

          <div className="flex items-center gap-4 mr-4">
            {user ? (
              <a
                href="/UserProfile"
                className="flex items-center gap-3 group"
              >
                <div className="flex flex-col items-end">
                  <p className="font-medium text-[#2889CE]">{user.username}</p>
                  <p className="text-sm text-[#1a6ba3]">{user.email}</p>
                </div>
                <img
                  src={user.profileImage || "src/assets/user-profile.png"}
                  className="w-10 h-10 rounded-full border-2 border-[#2889CE] p-0.5 group-hover:border-[#1a6ba3] transition-colors"
                  alt="Profile"
                />
              </a>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
            )}
          </div>
        </motion.header>
      )}
    </div>
  );
}