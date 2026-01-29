import React from "react";

const Loader = ({ message = "Loading data...", size = 16, color = "blue-500" }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div
          className={`w-${size} h-${size} border-4 border-${color} border-t-transparent border-solid rounded-full animate-spin`}
        ></div>
        <p className="mt-4 text-gray-800 font-medium text-lg sm:text-xl text-center">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Loader;
