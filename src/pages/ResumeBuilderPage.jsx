import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import React, { useState } from 'react';
import Navbar from './../components/Navbar';
import CVPreviewPDF from './../pageSection/CVPreviewPDF.jsx';
import EducationForm from './../pageSection/EducationForm';
import PersonalDetailsForm from '../pageSection/PersonalDetailsForm';
import SkillsForm from './../pageSection/SkillsForm';
import SummaryForm from './../pageSection/SummaryForm';
import WorkExperienceForm from './../pageSection/WorkExperienceForm';
import { Header, Footer } from './../pageSection/headerForm';

const ResumeBuilderPage = () => {
  const tabs = ['Personal Details', 'Work Experience', 'Education', 'Skills', 'Summary'];
  const [activeTab, setActiveTab] = useState('Personal Details');
  const [formData, setFormData] = useState({
    personal: {},
    work: [],
    education: [],
    skills: [],
    summary: '',
  });

  const [showCV, setShowCV] = useState(false);

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    } else {
      setShowCV(true);
    }
  };

  const renderSection = () => {
    if (showCV) {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">CV Preview (PDF)</h2>
          <div className="h-[800px] border rounded-md shadow">
            <PDFViewer width="100%" height="100%">
              <CVPreviewPDF formData={formData} />
            </PDFViewer>
          </div>

          <PDFDownloadLink
            document={<CVPreviewPDF formData={formData} />}
            fileName="Curriculum-Vitae.pdf"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {({ loading }) => (loading ? 'Generating PDF...' : 'Download CV')}
          </PDFDownloadLink>

          <button
            onClick={() => setShowCV(false)}
            className="block mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Kembali ke Editor
          </button>
        </div>
      );
    }

    // render form berdasarkan tab aktif
    switch (activeTab) {
      case 'Personal Details':
        return (
          <PersonalDetailsForm
            data={formData.personal}
            onNext={handleNext}
            onChange={(data) => setFormData({ ...formData, personal: data })}
          />
        );
      case 'Work Experience':
        return (
          <WorkExperienceForm
            data={formData.work}
            onNext={handleNext}
            onChange={(data) => setFormData({ ...formData, work: data })}
          />
        );
      case 'Education':
        return (
          <EducationForm
            data={formData.education}
            onNext={handleNext}
            onChange={(data) => setFormData({ ...formData, education: data })}
          />
        );
      case 'Skills':
        return (
          <SkillsForm
            data={formData.skills}
            onNext={handleNext}
            onChange={(data) => setFormData({ ...formData, skills: data })}
          />
        );
      case 'Summary':
        return (
          <SummaryForm
            data={formData.summary}
            onGenerate={() => setShowCV(true)}
            onChange={(data) => setFormData({ ...formData, summary: data })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Baru */}
      <Header />

      {/* Konten Utama */}
      <div className="flex-grow bg-gray-100 flex justify-center items-center p-6 pb-20">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center pt-6">Build Your CV</h1>
          {!showCV && <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />}
          <div className="p-6">{renderSection()}</div>
        </div>
      </div>

      {/* Footer Baru */}
      <Footer />
    </div>
  );
};

export default ResumeBuilderPage;