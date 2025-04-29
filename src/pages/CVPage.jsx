import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';
import CVPreview from './CVPreview';
import CVPreviewPDF from './CVPreviewPDF';
import NavBarDashboard from '../pageSection/navbarDashboard';
const CVPage = ({ formData }) => {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <NavBarDashboard />
      {/* Preview dalam browser */}
      <CVPreview formData={formData} />

      {/* Tombol untuk download PDF */}
      <div>

        <PDFDownloadLink
          document={<CVPreviewPDF formData={formData} />}
          fileName="Curriculum-Vitae.pdf"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default CVPage;
