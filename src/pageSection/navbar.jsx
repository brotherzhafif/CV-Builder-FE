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
    if (isMobile) return "text-[#2889CE] hover:text-[#1a6ba3] transition-colors duration-200";
    const baseColor = "text-[#2889CE]";
    const activeColor = currentSection === id ? "text-[#1a6ba3]" : "";
    const hoverColor = "hover:text-[#1a6ba3] transition-colors duration-200";
    return `${baseColor} ${hoverColor} ${activeColor}`;
  };

  return (
    <div className="relative">
      {isMobile ? (
        <motion.header
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-0 z-50 flex items-center justify-between w-full px-4 py-3 bg-white shadow-md"
        >
          {/* Logo Mobile - Posisi Presisi */}
          <div className="w-[120px] pl-2">
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                className="h-[40px] w-auto object-contain"
              />
            </Link>
          </div>

          <div className="relative pr-2">
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
                    className="w-6 h-6 text-[#2889CE]"
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
                    className="w-6 h-6 text-[#1a6ba3]"
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
                <ul className="absolute right-0 z-50 flex flex-col w-full gap-1 py-3 mt-3 bg-white rounded-lg shadow-md px-4">
                  <li onClick={() => setDropdownOpen(false)}>
                    <Link to="/" className="px-4 py-2 text-[#2889CE] hover:bg-blue-50 rounded-lg transition-all">
                      Beranda
                    </Link>
                  </li>
                  <li>
                    <div
                      onClick={() => setSubMenuOpen((prev) => !prev)}
                      className="px-4 py-2 text-[#2889CE] hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                    >
                      Tentang Kami
                    </div>
                    {subMenuOpen && (
                      <ul className="pl-4 mt-1 space-y-1">
                        <li onClick={() => setDropdownOpen(false)}>
                          <Link to="/visimisi" className="block px-4 py-2 text-[#2889CE] hover:bg-blue-50 rounded-lg">
                            CVScoring
                          </Link>
                        </li>
                        <li onClick={() => setDropdownOpen(false)}>
                          <Link to="/divisi" className="block px-4 py-2 text-[#2889CE] hover:bg-blue-50 rounded-lg">
                            CVGenerator
                          </Link>
                        </li>
                        <li onClick={() => setDropdownOpen(false)}>
                          <Link to="/faq" className="block px-4 py-2 text-[#2889CE] hover:bg-blue-50 rounded-lg">
                            FAQ
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li onClick={() => setDropdownOpen(false)}>
                    <Link to="/informasi" className="px-4 py-2 text-[#2889CE] hover:bg-blue-50 rounded-lg transition-all">
                      Informasi
                    </Link>
                  </li>
                  <li onClick={() => setDropdownOpen(false)}>
                    <Link to="/contact" className="px-4 py-2 text-[#2889CE] hover:bg-blue-50 rounded-lg transition-all">
                      Kontak
                    </Link>
                  </li>
                  <div className="mt-3 ml-2">
                    <div className="border border-[#2889CE] p-2 w-full rounded-2xl text-center hover:bg-[#2889CE] transition-colors duration-200">
                      <a href="/Loginpage" className="text-[#2889CE] hover:text-white">
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
          className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-8 h-[80px] transition-all duration-300 ${
            isScrolled ? "bg-white shadow-md" : ""
          }`}
        >
          {/* Logo Desktop - Posisi Presisi */}
          <div className="w-[200px] pl-14">
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                className="h-[45px] w-auto object-contain"
              />
            </Link>
          </div>

          <div className="flex gap-6 text-lg items-center">
            <Link to="/" className={`${navLinkStyle("getStarted")} px-4 py-2 hover:bg-blue-50 rounded-lg`}>
              Beranda
            </Link>
            <div className="relative group">
              <button className={`${navLinkStyle("whyUs")} px-4 py-2 hover:bg-blue-50 rounded-lg`}>
                Tentang Kami
              </button>
              <div className="absolute left-0 hidden pt-2 group-hover:block">
                <ul className="bg-white rounded-lg shadow-md w-48 text-sm text-left overflow-hidden">
                  <li>
                    <Link
                      to="/visimisi"
                      className="block px-4 py-3 text-[#2889CE] hover:bg-blue-50 transition-colors duration-200"
                    >
                      CVScoring
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/divisi"
                      className="block px-4 py-3 text-[#2889CE] hover:bg-blue-50 transition-colors duration-200"
                    >
                      CVGenerator
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/faq"
                      className="block px-4 py-3 text-[#2889CE] hover:bg-blue-50 transition-colors duration-200"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <Link to="/informasi" className={`${navLinkStyle("qnA")} px-4 py-2 hover:bg-blue-50 rounded-lg`}>
              Informasi
            </Link>
            <Link to="/contact" className={`${navLinkStyle("testimonial")} px-4 py-2 hover:bg-blue-50 rounded-lg`}>
              Kontak
            </Link>
          </div>

          <div className="flex items-center pr-6">
            <div className="bg-[#2889CE] px-6 py-2 rounded-2xl transition-colors duration-300 hover:bg-white border-2 border-[#2889CE] min-w-[100px] text-center">
              <a
                href="/Loginpage"
                className="text-white hover:text-[#2889CE] font-medium"
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