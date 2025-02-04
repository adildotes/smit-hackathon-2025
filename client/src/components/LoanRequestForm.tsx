import React, { useState } from 'react';

const LoanRequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    loanAmount: '',
    loanTerm: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Loan Request Submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl mb-4">Loan Request Form</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="loanAmount"
          placeholder="Loan Amount"
          value={formData.loanAmount}
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="loanTerm"
          placeholder="Loan Term (years)"
          value={formData.loanTerm}
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-success w-full">
          Submit Request
        </button>
      </div>
    </form>
  );
};

export default LoanRequestForm;
