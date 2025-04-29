import React, { useEffect, useState } from 'react';

const WorkExperienceForm = ({ data, onNext, onChange }) => {
  const [workList, setWorkList] = useState(data || [{
    title: '',
    employmentType: '',
    company: '',
    current: false,
    startDate: '',
    endDate: '',
    address: ''
  }]);

  useEffect(() => {
    onChange(workList);
  }, [workList]);

  const handleChange = (index, field, value) => {
    const updated = [...workList];
    updated[index][field] = value;
    setWorkList(updated);
  };

  const addExperience = () => setWorkList([...workList, {
    title: '',
    employmentType: '',
    company: '',
    current: false,
    startDate: '',
    endDate: '',
    address: ''
  }]);

  const removeExperience = (index) => setWorkList(workList.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {workList.map((work, index) => (
          <div key={index} className="space-y-6 border-b pb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-700">Work Experience #{index + 1}</h3>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Title Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="e.g Retail Sales Manager"
                  value={work.title}
                  onChange={(e) => handleChange(index, 'title', e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Employment Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Employment Type</label>
                <select
                  value={work.employmentType}
                  onChange={(e) => handleChange(index, 'employmentType', e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Please select</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Company</label>
                <input
                  type="text"
                  placeholder="e.g Microsoft"
                  value={work.company}
                  onChange={(e) => handleChange(index, 'company', e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Date Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Start Date</label>
                <input
                  type="month"
                  value={work.startDate}
                  onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {work.current ? 'End Date (Expected)' : 'End Date'}
                </label>
                <input
                  type="month"
                  value={work.endDate}
                  onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                  disabled={work.current}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Current Job Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={work.current}
                onChange={(e) => handleChange(index, 'current', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-sm text-gray-600">I am currently working in this role</label>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
              <input
                type="text"
                placeholder="e.g Rungkut Asri Timur VII"
                value={work.address}
                onChange={(e) => handleChange(index, 'address', e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={addExperience}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            + Add Another Experience
          </button>
          
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WorkExperienceForm;