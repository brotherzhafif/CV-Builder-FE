import React, { useEffect, useState } from "react";
import { Header, Footer } from "../pageSection/headerForm";
import { useNavigate } from "react-router-dom";

export default function CVHistoryPage() {
    const [cvs, setCvs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCVs = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Anda harus login untuk melihat riwayat CV.");
                navigate("/LoginPage");
                return;
            }

            try {
                const response = await fetch("https://cv-api-six.vercel.app/api/get-cvs", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Gagal mengambil data CV.");
                }

                const data = await response.json();
                if (data.success) {
                    setCvs(data.cvs);
                } else {
                    alert(data.message || "Terjadi kesalahan saat mengambil data CV.");
                }
            } catch (error) {
                console.error("Error fetching CVs:", error);
                alert("Gagal mengambil data CV. Silakan coba lagi.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCVs();
    }, [navigate]);

    const handleDownload = (pdfUrl, fileName) => {
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = fileName;
        link.target = "_blank";
        link.click();
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6 text-center">CV History</h1>
                {isLoading ? (
                    <p className="text-center text-blue-500">Loading...</p>
                ) : cvs.length === 0 ? (
                    <p className="text-center text-gray-500">No CVs found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cvs.map((cv) => (
                            <div
                                key={cv.cvId}
                                className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
                            >
                                <div>
                                    <h2 className="text-lg font-bold text-[#1a6ba3] mb-2">
                                        {cv.fileName}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Uploaded: {new Date(cv.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Score: {cv.scoring.totalScore}/100
                                    </p>
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <a
                                        href={cv.pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        View
                                    </a>
                                    <button
                                        onClick={() => handleDownload(cv.pdfUrl, cv.fileName)}
                                        className="text-green-500 hover:underline"
                                    >
                                        Download
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}