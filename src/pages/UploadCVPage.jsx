import * as pdfjsLib from "pdfjs-dist";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarDashboard from "../pageSection/navbarDashboard";
// Gunakan worker dari CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function UploadCVPage() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State untuk loading
  const navigate = useNavigate();

  const handleUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleUploadToAPI = async () => {
    if (!file) {
      alert("Silakan unggah file PDF terlebih dahulu.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda harus login untuk mengunggah CV.");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("cvFile", file);

    setIsLoading(true); // Set loading ke true sebelum upload
    try {
      const response = await fetch("https://cv-api-six.vercel.app/api/submit-cv", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Gagal mengunggah CV. Silakan coba lagi.");
      }

      const data = await response.json();
      if (data.success) {
        navigate("/result", { state: { cv: data.cv } }); // Kirim seluruh objek cv
      } else {
        alert(data.message || "Terjadi kesalahan saat memproses CV.");
      }
    } catch (error) {
      console.error("Error uploading CV:", error);
      alert("Gagal mengunggah CV. Silakan coba lagi.");
    } finally {
      setIsLoading(false); // Set loading ke false setelah selesai
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <NavBarDashboard />

      <h1 className="text-2xl font-bold mb-2">Upload Your CV</h1>
      <p className="text-gray-500 mb-6 text-center">
        Upload your PDF CV and get a score instantly based on content structure.
      </p>

      <label
        htmlFor="cv-upload"
        className="border-2 border-dashed border-blue-400 p-16 rounded-lg cursor-pointer"
      >
        <div className="flex flex-col items-center">
          <img
            src="https://img.icons8.com/?size=100&id=41qMbxehez2N&format=png"
            alt="Upload"
            className="mb-4"
          />
          <p className="text-blue-500">
            {file ? `${file.name} uploaded ✔️` : "Click or drag to upload PDF"}
          </p>
        </div>
        <input
          id="cv-upload"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleUpload}
        />
      </label>

      {file && (
        <button
          onClick={handleUploadToAPI}
          className={`mt-8 bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition ${isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={isLoading} // Nonaktifkan tombol saat loading
        >
          {isLoading ? "Uploading..." : "Upload and Get CV Score"}
        </button>
      )}

      {isLoading && (
        <p className="mt-4 text-blue-500">Please wait, your CV is being uploaded...</p>
      )}

      <button
        onClick={() => window.history.back()}
        className="mt-4 text-blue-500 underline"
      >
        Back
      </button>
    </div>
  );
}