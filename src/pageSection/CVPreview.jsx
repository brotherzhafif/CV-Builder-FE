import React from 'react';

const CVPreview = ({ formData }) => {
  const { personal, work, education, skills, summary } = formData;

  // Helper function untuk format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto p-6">
      {/* Header */}
      <header className="text-center border-b pb-4">
        <h1 className="text-3xl font-bold">
          {personal?.firstName} {personal?.lastName}
        </h1>
        {personal?.headline && (
          <p className="text-lg text-gray-600 mt-1">{personal.headline}</p>
        )}
        <div className="mt-2 text-sm text-gray-500">
          {[personal?.city, personal?.state].filter(Boolean).join(', ')}
          <br />
          {personal?.email} | {personal?.phone}
          <br />
          {personal?.portfolio && (
            <a href={personal.portfolio} className="text-blue-600">
              {personal.portfolio}
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="space-y-2">
          <h2 className="text-xl font-bold border-b pb-2">Summary</h2>
          <p className="text-gray-600 whitespace-pre-line">{summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {work?.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold border-b pb-2">Work Experience</h2>
          {work.map((job, i) => (
            <div key={i} className="space-y-1">
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <div className="flex justify-between">
                <p className="text-gray-600">
                  {job.company}
                  {job.employmentType && ` • ${job.employmentType}`}
                </p>
                <p className="text-gray-500 text-sm">
                  {formatDate(job.startDate)} -{' '}
                  {job.current ? 'Present' : formatDate(job.endDate)}
                </p>
              </div>
              {job.address && (
                <p className="text-sm text-gray-500">{job.address}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold border-b pb-2">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="space-y-1">
              <h3 className="font-semibold text-lg">{edu.degree}</h3>
              <div className="flex justify-between">
                <p className="text-gray-600">
                  {edu.fieldOfStudy}
                  {edu.institution && ` • ${edu.institution}`}
                  {edu.location && `, ${edu.location}`}
                </p>
                <p className="text-gray-500 text-sm">
                  {formatDate(edu.startDate)} -{' '}
                  {edu.current ? 'Present' : formatDate(edu.endDate)}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-xl font-bold border-b pb-2">Skills</h2>
          <ul className="list-disc list-inside columns-2">
            {skills.map((skill, i) => (
              <li key={i} className="text-gray-600">
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default CVPreview;