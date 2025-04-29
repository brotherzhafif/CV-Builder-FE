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
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="text" name="firstName" value={form.firstName || ''} onChange={handleChange} placeholder="e.g Gilang" className="input p-3" />
        <input type="text" name="lastName" value={form.lastName || ''} onChange={handleChange} placeholder="e.g Dermawan" className="input p-3" />
        <input type="text" name="otherNames" value={form.otherNames || ''} onChange={handleChange} placeholder="e.g Santoso" className="input p-3" />
      </div>
      <input type="text" name="headline" value={form.headline || ''} onChange={handleChange} placeholder="e.g Headline Title" className="input p-3 w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="state" value={form.state || ''} onChange={handleChange} placeholder="e.g Eight" className="input p-3" />
        <input type="text" name="city" value={form.city || ''} onChange={handleChange} placeholder="e.g Ho Chi Minh" className="input p-3" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="phone" value={form.phone || ''} onChange={handleChange} placeholder="e.g 098 000 000" className="input p-3" />
        <input type="email" name="email" value={form.email || ''} onChange={handleChange} placeholder="e.g example@gmail.com" className="input p-3" />
      </div>
      <input type="url" name="portfolio" value={form.portfolio || ''} onChange={handleChange} placeholder="e.g https://portfolio.com" className="input p-3 w-full" />
      <div className="text-right">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
          Next
        </button>
      </div>
    </form>
  );
};

export default PersonalDetailsForm;
