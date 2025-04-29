import { motion } from "framer-motion";
import React from "react";
import LogoSatvikara from "./../assets/logosatvikara.png";

export default function Testimonial() {
  const stats = [
    {
      number: "4",
      label: "Periode Kepengurusan",
    },
    {
      number: "80+",
      label: "Mahasiswa Pengurus",
    },
    {
      number: "10+",
      label: "Program Kerja Terlaksana",
    },
    {
      number: "80%",
      label: "Impact ke Masyarakat",
    },
  ];

  return (
    <motion.div
      id="whyUs"
      className="px-[8%] py-32 flex justify-center items-center bg-white"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center w-full text-center">
        {/* STATISTIK */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <p className="text-3xl font-bold text-[#1E64C8]">{stat.number}</p>
              <p className="text-base text-gray-700 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* LOGO */}
        <motion.img
          src={LogoSatvikara}
          alt="Logo Satvikara"
          className="w-[320px] md:w-[400px] mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        />

        {/* TEKS UTAMA */}
        <motion.p
          className="text-xl md:text-2xl font-semibold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="text-[#1E64C8]">Kabinet</span>{" "}
          <span className="text-[#800040] font-bold">#Satvikara</span>
        </motion.p>

        {/* DESKRIPSI */}
        <motion.p
          className="mt-4 text-base md:text-lg text-gray-700 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Dengan semangat untuk mengakar dan berkembang, Badan Pengurus Harian
          periode 2024–2025 siap mewujudkan HIMSI Pradita yang senantiasa tumbuh
          sebagai wadah pengembangan diri bagi anggotanya.
        </motion.p>

        {/* BUTTON */}
        <motion.button
          className="mt-10 px-6 py-3 bg-[#800040] text-white font-medium text-lg rounded-xl hover:bg-[#660033] transition duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Kenali Kepengurusan
        </motion.button>
      </div>
    </motion.div>
  );
}
