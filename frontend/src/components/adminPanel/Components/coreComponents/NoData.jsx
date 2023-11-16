import React from "react";

const NoData = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center">
      <svg
        className="w-16 h-16 text-gray-500 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 12H5M12 19l-7-7 7-7"
        />
      </svg>
      <h1 className="text-2xl font-bold text-gray-700">No Data</h1>
    </div>
  </div>
);

export default NoData;
