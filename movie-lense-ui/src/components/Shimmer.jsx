import React from "react";

const Shimmer = () => {
  return (
    <div
      className="space-y-4"
      style={{
        width: "75%",  // This ensures the shimmer takes up 75% width
        height: "300px",  // Fixed height for the shimmer container
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        margin: "0 auto",  // Center the shimmer container
      }}
    >
      {/* Header Shimmer */}
      <div className="flex animate-pulse space-x-4">
        {[...Array(1)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-300 h-6 rounded-md"
            style={{ flex: 1, height: "40px", margin: "0 8px" }}
          ></div>
        ))}
      </div>

      {/* Body Shimmer */}
      {[...Array(10)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex animate-pulse space-x-4">
          {[...Array(5)].map((_, cellIndex) => (
            <div
              key={cellIndex}
              className="bg-gray-300 h-6 rounded-md"
              style={{ flex: 1, height: "40px", margin: "0 8px" }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
