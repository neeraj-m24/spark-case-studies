// import React from "react";

// const Header = ({ currentEndpoint, onEndpointChange, endpoints }) => {
//   return (
//     <header className="w-full bg-[#fafbfc] shadow-xl p-4 mb-6 flex justify-between align-middle ">
//       <h1 className="text-2xl font-bold text-center">Metrics Data</h1>
//       <nav className="flex justify-center space-x-4">
//         {Object.keys(endpoints).map((key) => (
//           <button
//             key={key}
//             onClick={() => onEndpointChange(key)}
//             className={`px-4 rounded ${
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
import { NavLink } from "react-router-dom";

const Header = () => {
  const routes = [
    { path: "/", label: "Home" },
    { path: "/movies", label: "Movies" },
    { path: "/genres", label: "Genres" },
    { path: "/demographics", label: "Demographics" },
  ];

  return (
    <header className="w-full bg-[#fafbfc] shadow-xl p-4 mb-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-center">Metrics Data</h1>
      <nav className="flex justify-center space-x-4">
        {routes.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `px-4 py-2 rounded ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;

