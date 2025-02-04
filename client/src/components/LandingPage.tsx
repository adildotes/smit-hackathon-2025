import React from 'react';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
      <p className="text-xl mb-6">Providing financial solutions for everyone.</p>
      <Link href="/auth" className="btn btn-primary px-6 py-3 rounded-md shadow-lg">
        Get Started
      </Link>
    </div>
  );
};

export default LandingPage;
