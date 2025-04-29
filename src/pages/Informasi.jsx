import React from "react";
import NavbarWhite from "./../pageSection/NavbarWhite.jsx";
import Footer from "./../pageSection/footer.jsx";

const InformasiPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarWhite />
      <main className="flex-grow">
        <section className="text-center pt-32 mb-8 px-4">
          <h1 className="text-3xl font-bold text-[#7A1E5D]">Informasi</h1>
          <p className="text-gray-700 mt-2">
            Informasi Terkni Seputar Himpunan Mahasiswa
          </p>
        </section>

        <section className="px-6 md:px-16 lg:px-24 mb-20">
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-black w-max">
            Informasi
          </h2>
          <div className="flex gap-4 mb-8">
            <button className="bg-[#7A1E5D] text-white px-6 py-2 rounded-md font-semibold">
              Semua
            </button>
            <button className="border border-black px-6 py-2 rounded-md font-semibold">
              Lomba
            </button>
            <button className="border border-black px-6 py-2 rounded-md font-semibold">
              Akademik
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder konten kosong */}
            <div className="bg-white shadow-md border rounded-md h-[300px]" />
            <div className="bg-white shadow-md border rounded-md h-[300px]" />
            <div className="bg-white shadow-md border rounded-md h-[300px]" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InformasiPage;
