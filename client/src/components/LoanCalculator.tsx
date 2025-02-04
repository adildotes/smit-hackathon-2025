'use client'
import React, { useState } from 'react';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [loanTerm, setLoanTerm] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<string>('0');

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount.toString());
    const calculateInterest = parseFloat(interestRate.toString()) / 100 / 12;
    const calculatePayments = parseFloat(loanTerm.toString()) * 12;
    const x = Math.pow(1 + calculateInterest, calculatePayments);
    const monthly = (principal * x * calculateInterest) / (x - 1);
    setMonthlyPayment(monthly.toFixed(2));
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl mb-4">Loan Calculator</h2>
      <div className="space-y-4">
        <input
          type="number"
          placeholder="Loan Amount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          placeholder="Interest Rate (%)"
          value={interestRate}
          onChange={(e) => setInterestRate(parseFloat(e.target.value))}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          placeholder="Loan Term (years)"
          value={loanTerm}
          onChange={(e) => setLoanTerm(parseFloat(e.target.value))}
          className="input input-bordered w-full"
        />
        <button onClick={calculateLoan} className="btn btn-success w-full">
          Calculate
        </button>
        {monthlyPayment && (
          <p className="mt-4 font-bold">Your Monthly Payment: ${monthlyPayment}</p>
        )}
      </div>
    </div>
  );
};

export default LoanCalculator;
