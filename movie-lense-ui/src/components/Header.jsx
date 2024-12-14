import React from "react";

const Header = ({ endpoints, selected, onSelect }) => {
  return (
    <div className="flex justify-around mb-4">
      {endpoints.map((endpoint) => (
        <button
          key={endpoint}
          className={`px-4 py-2 rounded ${
            selected === endpoint
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black hover:bg-blue-300"
          }`}
          onClick={() => onSelect(endpoint)}
        >
          {endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Header;
