

// import React, { useState, useEffect } from "react";
// import Table from "./components/Table";
// import Shimmer from "./components/Shimmer";
// import GenreChart from "./components/GenreChart";
// import Header from "./components/Header";
// import DemographicsChart from "./components/DemographicsChart";  // Import DemographicsChart

// const App = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [endpoint, setEndpoint] = useState("movies");

//   const endpoints = {
//     movies: {
//       url: "http://localhost:8080/api/movies",
//       headers: ["Movie ID", "Title", "Genres", "Avg Rating", "Total Ratings"],
//     },
//     genres: {
//       url: "http://localhost:8080/api/genres",
//       headers: ["Genre", "Avg Rating", "Total Ratings"],
//     },
//     demographics: {
//       url: "http://localhost:8080/api/demographics",
//       headers: ["Age", "Gender", "Location", "Avg Rating", "Total Ratings"],
//     },
//   };

//   // Fetch data from the selected endpoint
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(endpoints[endpoint].url);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const json = await response.json();
//         setData(json);
//         console.log("Fetched data:", json); // Debug log
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [endpoint]);

//   return (
//     <div className="min-h-screen bg-[#fafbfc] flex flex-col">
//       {/* Full-width Header */}
//       <Header
//         currentEndpoint={endpoint}
//         onEndpointChange={setEndpoint}
//         endpoints={endpoints}
//       />

//       <div className="flex-grow p-4">
//         {/* Conditional Rendering for Charts and Data */}
//         {endpoint === "genres" && <GenreChart genres={data} />}
//         {endpoint === "demographics" && <DemographicsChart data={data} />} {/* Display DemographicsChart */}

//         {/* Display Loading, Error, or Table */}
//         {loading && <Shimmer />}
//         {error && <p className="text-red-500">Error: {error}</p>}
//         {!loading && !error && data.length === 0 && (
//           <p>No data available for this category.</p>
//         )}
//         {!loading && !error && data.length > 0 &&  (
//           <Table headers={endpoints[endpoint].headers} data={data} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;




import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import Shimmer from "./components/Shimmer";
import GenreChart from "./components/GenreChart";
import Header from "./components/Header";
import DemographicsChart from "./components/DemographicsChart";  // Import DemographicsChart
import { Outlet } from "react-router-dom";

const App = () => {
  
  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col">
      {/* Full-width Header */}
      <Header/>

      <div className="flex-grow p-4">
        <Outlet/>
      </div>
    </div>
  );
};

export default App;