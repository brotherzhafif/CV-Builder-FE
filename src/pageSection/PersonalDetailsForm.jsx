import React, { useEffect, useState } from 'react';

const PersonalDetailsForm = ({ data, onNext, onChange }) => {
  const [form, setForm] = useState(data || {});

  useEffect(() => {
    onChange(form);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
        {/* Nama Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName || ''}
                onChange={handleChange}
                placeholder="e.g Gilang"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName || ''}
                onChange={handleChange}
                placeholder="e.g Dermawan"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Other Names</label>
              <input
                type="text"
                name="otherNames"
                value={form.otherNames || ''}
                onChange={handleChange}
                placeholder="e.g Santoso"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Headline Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Career Headline</label>
            <input
              type="text"
              name="headline"
              value={form.headline || ''}
              onChange={handleChange}
              placeholder="e.g Headline Title"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Location Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">State of Residence</label>
            <input
              type="text"
              name="state"
              value={form.state || ''}
              onChange={handleChange}
              placeholder="e.g Indonesia"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">City/Town</label>
            <input
              type="text"
              name="city"
              value={form.city || ''}
              onChange={handleChange}
              placeholder="e.g Jakarta"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={form.phone || ''}
              onChange={handleChange}
              placeholder="e.g 098 000 000"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email || ''}
              onChange={handleChange}
              placeholder="e.g example@gmail.com"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Portfolio Section */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Website/Portfolio URL</label>
          <input
            type="url"
            name="portfolio"
            value={form.portfolio || ''}
            onChange={handleChange}
            placeholder="e.g https://portfolio.com"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Button Section */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors duration-200"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;