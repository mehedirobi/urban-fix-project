import React from "react";

/**
 * Safe size mapping (Tailwind does NOT support dynamic class strings)
 */
const SIZE_MAP = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-14 h-14",
  xl: "w-20 h-20",
};

/**
 * Safe color mapping
 */
const COLOR_MAP = {
  blue: "border-blue-500",
  red: "border-red-500",
  green: "border-green-500",
  gray: "border-gray-500",
  primary: "border-primary",
};

const Loader = ({
  message = "Loading data...",
  size = "md",
  color = "blue",
}) => {
  const sizeClass = SIZE_MAP[size] || SIZE_MAP.md;
  const colorClass = COLOR_MAP[color] || COLOR_MAP.blue;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center">

        {/* Spinner */}
        <div
          className={[
            sizeClass,
            "border-4",
            colorClass,
            "border-t-transparent rounded-full animate-spin",
          ].join(" ")}
        />

        {/* Message */}
        <p className="mt-4 text-gray-800 font-medium text-lg sm:text-xl text-center">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Loader;