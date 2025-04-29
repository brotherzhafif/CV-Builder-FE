import { useMediaQuery } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./../assets/m-logo.png";

export default function Navbar() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const sections = ["getStarted", "whyUs", "qnA", "testimonial"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkStyle = (id) => {
    if (isMobile) return "text-black hover:text-purple-500";
    const baseColor = "text-black";
    const activeColor = currentSection === id ? "text-purple-500" : "";
    const hoverColor = "hover:text-purple-500";
    return `${baseColor} ${hoverColor} ${activeColor}`;
  };

  return (
    <div className="relative">


      {isMobile ? (
        <motion.header
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-0 z-50 flex items-center justify-between w-screen px-6 pt-3 bg-white shadow-md"
        >
          <div className="w-[120px]">
            <a href="#getStarted">
              <img
                src={Logo}
                alt="Logo"
                className="w-full h-auto max-h-[50px] object-contain"
              />
            </a>
          </div>

          <div className="relative">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center justify-center btn btn-ghost btn-circle"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                {!dropdownOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </div>

              {dropdownOpen && (
                <ul className="absolute right-0 z-50 flex flex-col items-center justify-center w-screen gap-3 py-4 mt-3 bg-white rounded-lg shadow-md px-9 menu menu-sm">
                  <li onClick={() => setDropdownOpen(false)}>
                    <Link to="/" className="text-black hover:text-purple-500">
                      Beranda
                    </Link>
                  </li>
                  <li>
                    <div
                      onClick={() => setSubMenuOpen((prev) => !prev)}
                      className="text-black hover:text-purple-500 cursor-pointer"
                    >
                      Tentang Kami
                    </div>
                    {subMenuOpen && (
                      <ul className="bg-white shadow-sm rounded-md mt-1">
                        <li onClick={() => setDropdownOpen(false)}>
                          <Link to="/visimisi" className="text-black hover:text-purple-500">
                            CVScoring
                          </Link>
                        </li>
                        <li onClick={() => setDropdownOpen(false)}>
                          <Link to="/divisi" className="text-black hover:text-purple-500">
                            CVGenerator
                          </Link>
                        </li>
                        <li onClick={() => setDropdownOpen(false)}>
                          <Link to="/faq" className="text-black hover:text-purple-500">
                            FAQ
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li onClick={() => setDropdownOpen(false)}>
                    <Link to="/informasi" className="text-black hover:text-purple-500">
                      Informasi
                    </Link>
                  </li>
                  <li onClick={() => setDropdownOpen(false)}>
                    <Link to="/contact" className="text-black hover:text-purple-500">
                      Kontak
                    </Link>
                  </li>
                  <div className="flex justify-center gap-2 mt-3">
                    <div className="border border-[#536CE3] p-2 w-[80px] h-[40px] rounded-2xl text-center">
                      <a href="/Loginpage" className="text-black">
                        Login
                      </a>
                    </div>
                  </div>
                </ul>
              )}
            </div>
          </div>
        </motion.header>
      ) : (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-8 lg:px-12 xl:px-16 h-[70px] transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : ""
            }`}
        >
          <div className="flex items-center gap-10">
            <div className="w-[120px]">
              <Link to="/">
                <img
                  src={Logo}
                  alt="Logo"
                  className="w-full h-auto max-h-[50px] object-contain"
                />
              </Link>
            </div>
          </div>

          <div className="flex gap-6 pr-2 text-base lg:text-lg xl:text-xl items-center">
            <Link to="/" className={navLinkStyle("getStarted")}>Beranda</Link>
            <div className="relative group">
              <button className={navLinkStyle("whyUs")}>Tentang Kami</button>
              <div className="absolute left-0 hidden pt-2 group-hover:block">
                <ul className="bg-white rounded-lg shadow-md w-48 text-sm text-left">
                  <li>
                    <Link to="/visimisi" className="block px-4 py-2 text-black hover:text-purple-500">
                      CVScoring
                    </Link>
                  </li>
                  <li>
                    <Link to="/divisi" className="block px-4 py-2 text-black hover:text-purple-500">
                      CVGenerator
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="block px-4 py-2 text-black hover:text-purple-500">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <Link to="/informasi" className={navLinkStyle("qnA")}>Informasi</Link>
            <Link to="/contact" className={navLinkStyle("testimonial")}>Kontak</Link>
          </div>

          <div className="flex items-center gap-4 pr-20">
            <div className="border border-[#536CE3] px-4 py-2 rounded-2xl">
              <a
                href="/Loginpage"
                className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
              >
                Login
              </a>
            </div>
          </div>


        </motion.header>
      )}
    </div>
  );
}
