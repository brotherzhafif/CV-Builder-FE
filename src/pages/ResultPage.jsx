import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header, Footer } from "../pageSection/headerForm";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cv } = location.state || {};

  if (!cv) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <h1 className="text-2xl font-bold mb-4">No CV Data Available</h1>
        <button
          onClick={() => navigate("/upload")}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
        >
          Upload Again
        </button>
      </div>
    );
  }

  const { scoring, pdfUrl } = cv;
  const { scores, totalScore } = scoring;

  // Fungsi untuk memberikan saran berdasarkan skor
  const getSuggestions = () => {
    const suggestions = [];

    if (scores.profileSummary < 15) {
      suggestions.push("Perbaiki ringkasan profil Anda agar lebih menarik dan relevan.");
    }
    if (scores.cvLength < 15) {
      suggestions.push("Pastikan panjang CV Anda sesuai dengan standar (tidak terlalu panjang atau pendek).");
    }
    if (scores.skills < 10) {
      suggestions.push("Tambahkan lebih banyak keterampilan yang relevan dengan pekerjaan yang Anda lamar.");
    }
    if (scores.format < 10) {
      suggestions.push("Perbaiki format CV Anda agar lebih profesional dan mudah dibaca.");
    }
    if (scores.keywords < 15) {
      suggestions.push("Tambahkan lebih banyak kata kunci yang relevan dengan deskripsi pekerjaan.");
    }
    if (scores.professionalContacts < 5) {
      suggestions.push("Pastikan Anda menyertakan kontak profesional seperti email dan nomor telepon.");
    }

    if (totalScore >= 90) {
      suggestions.push("CV Anda sudah sangat bagus! Tidak ada perbaikan yang diperlukan.");
    } else if (totalScore < 50) {
      suggestions.push("CV Anda memerlukan banyak perbaikan. Fokus pada semua aspek yang dinilai.");
    }

    return suggestions;
  };

  const suggestions = getSuggestions();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-col lg:flex-row items-start justify-center min-h-screen bg-gray-50 px-8 py-12 space-y-8 lg:space-y-0 lg:space-x-12">

        {/* Left Section: Score Details */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/3">
          <h2 className="text-xl font-bold mb-4">Your Score</h2>
          <div className="text-4xl font-bold text-green-600 mb-6">{totalScore}/100</div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Profile Summary</span>
              <span className="font-bold text-green-600">{scores.profileSummary}/20</span>
            </div>
            <div className="flex justify-between">
              <span>CV Length</span>
              <span className="font-bold text-green-600">{scores.cvLength}/20</span>
            </div>
            <div className="flex justify-between">
              <span>Skills</span>
              <span className="font-bold text-green-600">{scores.skills}/15</span>
            </div>
            <div className="flex justify-between">
              <span>Format</span>
              <span className="font-bold text-green-600">{scores.format}/15</span>
            </div>
            <div className="flex justify-between">
              <span>Keywords</span>
              <span className="font-bold text-green-600">{scores.keywords}/20</span>
            </div>
            <div className="flex justify-between">
              <span>Professional Contacts</span>
              <span className="font-bold text-green-600">{scores.professionalContacts}/10</span>
            </div>
          </div>

          {/* Suggestions Section */}
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-4">Suggestions for Improvement</h3>
            {suggestions.length > 0 ? (
              <ul className="list-disc list-inside space-y-2">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="text-gray-700">
                    {suggestion}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">No suggestions available.</p>
            )}
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
          >
            Back to Home
          </button>
        </div>

        {/* Right Section: CV Preview */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-2/3">
          <h2 className="text-xl font-bold mb-4">Your CV Preview</h2>
          <iframe
            src={pdfUrl}
            title="CV Preview"
            className="w-full h-[600px] border rounded-lg"
          ></iframe>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
          >
            Download CV
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}