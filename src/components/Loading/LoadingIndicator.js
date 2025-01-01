// LoadingIndicator.js
import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingIndicator = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-600">
      {/* Animated Spinner */}
      <div className="flex items-center justify-center mb-4">
        <FaSpinner className="animate-spin text-blue-500 text-5xl" />
      </div>
      {/* Loading Text */}
      <h2 className="text-lg font-semibold animate-pulse">
        Loading business details...
      </h2>
    </div>
  );
};

export default LoadingIndicator;
