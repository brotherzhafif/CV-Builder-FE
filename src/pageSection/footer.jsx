import React from 'react';
import IconInstagram from './../assets/icon-instagram.png';
import IconLinkedIn from './../assets/icon-linkedin.png';
import IconYouTube from './../assets/icon-youtube.png';
import LogoMaxy from './../assets/m-logo.png';

export default function Footer() {
  return (
    <footer className="bg-[#0089ED] text-white px-6 md:px-20 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

        {/* Kolom 1: Logo + Deskripsi */}
        <div className="space-y-4">
          <img src={LogoMaxy} alt="Logo Maxy Academy" className="w-28" />
          <p className="text-sm leading-relaxed max-w-xs">
            Maxy Academy unggul dalam menyediakan pembelajaran praktis berbasis industri yang langsung aplikatif untuk pengembangan karier dan bisnis.
          </p>
        </div>

        {/* Kolom 2: Navigasi */}
        <div>
          <h3 className="text-lg font-bold mb-4">Navigasi</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Beranda</a></li>
            <li><a href="#whyUs" className="hover:underline">Tentang Kami</a></li>
            <li><a href="#" className="hover:underline">Informasi</a></li>
            <li><a href="#faq" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Kontak</a></li>
          </ul>
        </div>

        {/* Kolom 3: Sosial Media */}
        <div>
          <h3 className="text-lg font-bold mb-4">Ikuti Kami</h3>
          <div className="flex gap-4 mb-6">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <img src={IconYouTube} alt="YouTube" className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src={IconLinkedIn} alt="LinkedIn" className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={IconInstagram} alt="Instagram" className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
            </a>
          </div>
          <p className="text-xs">© 2025 Maxy Academy. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
