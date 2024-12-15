import React from "react";

const ShimmerCard = () => {
  return (
    <div className="p-4 max-w-lg mx-auto space-y-6">
      {/* Bar graph shimmer */}
      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            {/* Bar label */}
            <div className="bg-gray-300 h-6 w-16 rounded-md"></div>
            
            {/* Bar shimmer */}
            <div
              className="bg-gray-300 h-6 rounded-md"
              style={{
                flex: 1,
                width: `${Math.random() * 80 + 20}%`, // Random width to simulate bars
                animation: "shimmer 1.5s infinite ease-in-out", // Apply shimmer animation
              }}
            ></div>
          </div>
        ))}
      </div>
      
      {/* Add shimmer effect to mimic bar loading */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: 200px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ShimmerCard;
