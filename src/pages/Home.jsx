// src/pages/Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Your Dashboard</h1>
        <p className="text-lg text-gray-500 mb-6">All your data in one place.</p>
        <img
          src="https://source.unsplash.com/featured/?technology,dashboard"
          alt="Dashboard"
          className="rounded-xl shadow-md w-full max-w-md mx-auto"
        />
      </div>
    </div>
  );
};

export default Home;
