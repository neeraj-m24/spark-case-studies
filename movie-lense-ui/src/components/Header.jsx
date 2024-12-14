// import React from "react";

// const Header = ({ currentEndpoint, onEndpointChange, endpoints }) => {
//   return (
//     <header className="mb-6 flex justify-between border-b pb-2">
//       <h1 className="text-2xl font-bold mb-4">Metrics Data</h1>
//       <nav className="flex space-x-4">
//         {Object.keys(endpoints).map((key) => (
//           <button
//             key={key}
//             onClick={() => onEndpointChange(key)}
//             className={`px-2 py-1 rounded ${
//               currentEndpoint === key
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200 hover:bg-gray-300"
//             }`}
//           >
//             {key.charAt(0).toUpperCase() + key.slice(1)}
//           </button>
//         ))}
//       </nav>
//     </header>
//   );
// };

// export default Header;


import React from "react";

const Header = ({ currentEndpoint, onEndpointChange, endpoints }) => {
  return (
    <header className="w-full bg-[#fafbfc] shadow-xl p-4 mb-6 flex justify-between align-middle ">
      <h1 className="text-2xl font-bold text-center">Metrics Data</h1>
      <nav className="flex justify-center space-x-4">
        {Object.keys(endpoints).map((key) => (
          <button
            key={key}
            onClick={() => onEndpointChange(key)}
            className={`px-4 rounded ${
              currentEndpoint === key
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
