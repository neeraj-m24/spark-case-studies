// // import React from "react";
// // import GenreChart from "./GenreChart";
// // import DemographicsChart from "./DemographicsChart";
// // import Table from "./Table";

// // const Home = ({ data, loading, error, endpoint }) => {
// //     const [data, setData] = useState([]);
// //         const [loading, setLoading] = useState(false);
// //         const [error, setError] = useState(null);
// //         const headers = ["Movie ID", "Title", "Genres", "Avg Rating", "Total Ratings"]
// //   return (
// //     <div className="space-y-8">
// //       {/* First div: Contains both charts */}
// //       <div className="space-y-8">
// //         <GenreChart genres={data} />
// //         <DemographicsChart data={data} />

// //       </div>

// //       {/* Second div: Movies Table */}
// //       <div>
// //         {loading && <Shimmer />}
// //         {error && <p className="text-red-500">Error: {error}</p>}
// //         {!loading && !error && data.length === 0 && (
// //           <p>No data available for this category.</p>
// //         )}
        
// //           <Table headers={headers} data={data} />
        
// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;


// import React, { useState, useEffect } from "react";
// import GenreChart from "./GenreChart";
// import DemographicsChart from "./DemographicsChart";
// import Table from "./Table";
// import Shimmer from "./Shimmer";
// import ShimmerCard from "./ShimmerCard";

// const Home = () => {
//   const genreUrl = "http://localhost:8080/api/genres";
//   const demographicsUrl = "http://localhost:8080/api/demographics";

//   // State for genres
//   const [genreData, setGenreData] = useState([]);
//   const [genreLoading, setGenreLoading] = useState(false);
//   const [genreError, setGenreError] = useState(null);

//   // State for demographics
//   const [demographicsData, setDemographicsData] = useState([]);
//   const [demographicsLoading, setDemographicsLoading] = useState(false);
//   const [demographicsError, setDemographicsError] = useState(null);

//   // State for table
//   const headers = ["Genre", "Avg Rating", "Total Ratings"]; // Example headers for genres
//   const [tableData, setTableData] = useState([]);

//   // Fetch genres data
//   useEffect(() => {
//     const fetchGenres = async () => {
//       setGenreLoading(true);
//       setGenreError(null);
//       try {
//         const response = await fetch(genreUrl);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const json = await response.json();
//         setGenreData(json);
//         setTableData(json); // Populate table with genres data
//         console.log("Fetched genre data:", json);
//       } catch (err) {
//         setGenreError(err.message);
//       } finally {
//         setGenreLoading(false);
//       }
//     };

//     fetchGenres();
//   }, [genreUrl]);

//   // Fetch demographics data
//   useEffect(() => {
//     const fetchDemographics = async () => {
//       setDemographicsLoading(true);
//       setDemographicsError(null);
//       try {
//         const response = await fetch(demographicsUrl);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const json = await response.json();
//         setDemographicsData(json);
//         console.log("Fetched demographics data:", json);
//       } catch (err) {
//         setDemographicsError(err.message);
//       } finally {
//         setDemographicsLoading(false);
//       }
//     };

//     fetchDemographics();
//   }, [demographicsUrl]);

//   return (
//     <div className="space-y-8">
//       {/* First div: Contains both charts */}
//       <div className="space-y-8">
//         <div>
//         {genreLoading ? (
//           <ShimmerCard />
//         ) : genreError ? (
//           <p className="text-red-500">Error: {genreError}</p>
//         ) : (
//           <GenreChart genres={genreData} />
//         )}
//         </div>

//         <div>
//         {demographicsLoading ? (
//           <ShimmerCard />
//         ) : demographicsError ? (
//           <p className="text-red-500">Error: {demographicsError}</p>
//         ) : (
//           <DemographicsChart data={demographicsData} />
//         )}
//         </div>
//       </div>

//       {/* Second div: Movies Table */}
//       <div>
//         {genreLoading && <Shimmer />}
//         {genreError && <p className="text-red-500">Error: {genreError}</p>}
//         {!genreLoading && !genreError && tableData.length === 0 && (
//           <p>No data available for this category.</p>
//         )}
//         {!genreLoading && !genreError && tableData.length > 0 && (
//           <Table headers={headers} data={tableData} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;





// import React, { useState, useEffect } from "react";
// import GenreChart from "./GenreChart";
// import DemographicsChart from "./DemographicsChart";
// import Table from "./Table";
// import Shimmer from "./Shimmer";
// import ShimmerCard from "./ShimmerCard";

// const Home = () => {
//   const genreUrl = "http://localhost:8080/api/genres";
//   const demographicsUrl = "http://localhost:8080/api/demographics";

//   // State for genres
//   const [genreData, setGenreData] = useState([]);
//   const [genreLoading, setGenreLoading] = useState(false);
//   const [genreError, setGenreError] = useState(null);

//   // State for demographics
//   const [demographicsData, setDemographicsData] = useState([]);
//   const [demographicsLoading, setDemographicsLoading] = useState(false);
//   const [demographicsError, setDemographicsError] = useState(null);

//   // State for table
//   const headers = ["Genre", "Avg Rating", "Total Ratings"]; // Example headers for genres
//   const [tableData, setTableData] = useState([]);

//   // Fetch genres data
//   useEffect(() => {
//     const fetchGenres = async () => {
//       setGenreLoading(true);
//       setGenreError(null);
//       try {
//         const response = await fetch(genreUrl);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const json = await response.json();
//         setGenreData(json);
//         setTableData(json); // Populate table with genres data
//         console.log("Fetched genre data:", json);
//       } catch (err) {
//         setGenreError(err.message);
//       } finally {
//         setGenreLoading(false);
//       }
//     };

//     fetchGenres();
//   }, [genreUrl]);

//   // Fetch demographics data
//   useEffect(() => {
//     const fetchDemographics = async () => {
//       setDemographicsLoading(true);
//       setDemographicsError(null);
//       try {
//         const response = await fetch(demographicsUrl);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const json = await response.json();
//         setDemographicsData(json);
//         console.log("Fetched demographics data:", json);
//       } catch (err) {
//         setDemographicsError(err.message);
//       } finally {
//         setDemographicsLoading(false);
//       }
//     };

//     fetchDemographics();
//   }, [demographicsUrl]);

//   return (
//     <div className="space-y-8">
//       {/* First div: Contains both charts side by side */}
//       <div className="flex space-x-8">
//         <div className="flex-1">
//           {genreLoading ? (
//             <ShimmerCard />
//           ) : genreError ? (
//             <p className="text-red-500">Error: {genreError}</p>
//           ) : (
//             <GenreChart genres={genreData} />
//           )}
//         </div>

//         <div className="flex-1">
//           {demographicsLoading ? (
//             <ShimmerCard />
//           ) : demographicsError ? (
//             <p className="text-red-500">Error: {demographicsError}</p>
//           ) : (
//             <DemographicsChart data={demographicsData} />
//           )}
//         </div>
//       </div>

//       {/* Second div: Movies Table */}
//       <div>
//         {genreLoading && <Shimmer />}
//         {genreError && <p className="text-red-500">Error: {genreError}</p>}
//         {!genreLoading && !genreError && tableData.length === 0 && (
//           <p>No data available for this category.</p>
//         )}
//         {!genreLoading && !genreError && tableData.length > 0 && (
//           <Table headers={headers} data={tableData} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;








// import React, { useState, useEffect } from "react";
// import GenreChart from "./GenreChart";
// import DemographicsChart from "./DemographicsChart";
// import Table from "./Table";
// import Shimmer from "./Shimmer";
// import ShimmerCard from "./ShimmerCard";

// const Home = () => {
//   const genreUrl = "http://localhost:8080/api/genres";
//   const demographicsUrl = "http://localhost:8080/api/demographics";

//   // State for genres
//   const [genreData, setGenreData] = useState([]);
//   const [genreLoading, setGenreLoading] = useState(false);
//   const [genreError, setGenreError] = useState(null);

//   // State for demographics
//   const [demographicsData, setDemographicsData] = useState([]);
//   const [demographicsLoading, setDemographicsLoading] = useState(false);
//   const [demographicsError, setDemographicsError] = useState(null);

//   // State for table
//   const headers = ["Genre", "Avg Rating", "Total Ratings"]; // Example headers for genres
//   const [tableData, setTableData] = useState([]);

//   // Fetch genres data
//   useEffect(() => {
//     const fetchGenres = async () => {
//       setGenreLoading(true);
//       setGenreError(null);
//       try {
//         const response = await fetch(genreUrl);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const json = await response.json();
//         setGenreData(json);
//         setTableData(json); // Populate table with genres data
//         console.log("Fetched genre data:", json);
//       } catch (err) {
//         setGenreError(err.message);
//       } finally {
//         setGenreLoading(false);
//       }
//     };

//     fetchGenres();
//   }, [genreUrl]);

//   // Fetch demographics data
//   useEffect(() => {
//     const fetchDemographics = async () => {
//       setDemographicsLoading(true);
//       setDemographicsError(null);
//       try {
//         const response = await fetch(demographicsUrl);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const json = await response.json();
//         setDemographicsData(json);
//         console.log("Fetched demographics data:", json);
//       } catch (err) {
//         setDemographicsError(err.message);
//       } finally {
//         setDemographicsLoading(false);
//       }
//     };

//     fetchDemographics();
//   }, [demographicsUrl]);

//   return (
//     <div className="space-y-8">
//       {/* First div: Contains both charts side by side */}
//       <div className="flex space-x-8">
//         <div className="flex-1 min-h-[200px]"> {/* Reduced height to 200px */}
//           {genreLoading ? (
//             <ShimmerCard />
//           ) : genreError ? (
//             <p className="text-red-500">Error: {genreError}</p>
//           ) : (
//             <div className="h-full">
//               <GenreChart genres={genreData} />
//             </div>
//           )}
//         </div>

//         <div className="flex-1 min-h-[200px]"> {/* Reduced height to 200px */}
//           {demographicsLoading ? (
//             <ShimmerCard />
//           ) : demographicsError ? (
//             <p className="text-red-500">Error: {demographicsError}</p>
//           ) : (
//             <div className="h-full">
//               <DemographicsChart data={demographicsData} />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Second div: Movies Table */}
//       <div>
//         {genreLoading && <Shimmer />}
//         {genreError && <p className="text-red-500">Error: {genreError}</p>}
//         {!genreLoading && !genreError && tableData.length === 0 && (
//           <p>No data available for this category.</p>
//         )}
//         {!genreLoading && !genreError && tableData.length > 0 && (
//           <Table headers={headers} data={tableData} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from "react";
import GenreChart from "./GenreChart"; // Assuming this chart shows genre data
import DemographicsChart from "./DemographicsChart"; // Assuming this chart shows demographic data
import Table from "./Table";
import Shimmer from "./Shimmer";
import ShimmerCard from "./ShimmerCard";

const Home = () => {
  const movieUrl = "http://localhost:8080/api/movies"; // Endpoint for movies data
  const genreUrl = "http://localhost:8080/api/genres"; // Assuming you want to keep genre data
  const demographicsUrl = "http://localhost:8080/api/demographics"; // Assuming demographics data

  // State for movies
  const [movieData, setMovieData] = useState([]);
  const [movieLoading, setMovieLoading] = useState(false);
  const [movieError, setMovieError] = useState(null);

  // State for genres
  const [genreData, setGenreData] = useState([]);
  const [genreLoading, setGenreLoading] = useState(false);
  const [genreError, setGenreError] = useState(null);

  // State for demographics
  const [demographicsData, setDemographicsData] = useState([]);
  const [demographicsLoading, setDemographicsLoading] = useState(false);
  const [demographicsError, setDemographicsError] = useState(null);

  // Table headers for movies
  const movieHeaders = ["Movie ID", "Title", "Genres", "Avg Rating", "Total Ratings"];

  useEffect(() => {
    const fetchMovies = async () => {
      setMovieLoading(true);
      setMovieError(null);
      try {
        const response = await fetch(movieUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setMovieData(json); // Set the movie data
        console.log("Fetched movie data:", json);
      } catch (err) {
        setMovieError(err.message);
      } finally {
        setMovieLoading(false);
      }
    };

    fetchMovies();
  }, [movieUrl]);

  useEffect(() => {
    const fetchGenres = async () => {
      setGenreLoading(true);
      setGenreError(null);
      try {
        const response = await fetch(genreUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setGenreData(json); // Set genre data
        console.log("Fetched genre data:", json);
      } catch (err) {
        setGenreError(err.message);
      } finally {
        setGenreLoading(false);
      }
    };

    fetchGenres();
  }, [genreUrl]);

  useEffect(() => {
    const fetchDemographics = async () => {
      setDemographicsLoading(true);
      setDemographicsError(null);
      try {
        const response = await fetch(demographicsUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setDemographicsData(json); // Set demographics data
        console.log("Fetched demographics data:", json);
      } catch (err) {
        setDemographicsError(err.message);
      } finally {
        setDemographicsLoading(false);
      }
    };

    fetchDemographics();
  }, [demographicsUrl]);

  return (
    <div className="space-y-8">
      {/* First div: Contains both charts side by side */}
      <div className="flex space-x-8">
        <div className="flex-1 min-h-[200px]">
          {genreLoading ? (
            <ShimmerCard />
          ) : genreError ? (
            <p className="text-red-500"></p>
          ) : (
            <div className="h-full">
              <GenreChart genres={genreData} />
            </div>
          )}
        </div>

        <div className="flex-1 min-h-[200px]">
          {demographicsLoading ? (
            <ShimmerCard />
          ) : demographicsError ? (
            <p className="text-red-500"></p>
          ) : (
            <div className="h-full">
              <DemographicsChart data={demographicsData} />
            </div>
          )}
        </div>
      </div>

      {/* Second div: Movies Table */}
      <div>
        {movieLoading && <Shimmer />} {/* Show shimmer effect while loading */}
        {movieError && <p className="text-red-500">Error: {movieError}</p>} {/* Error message */}
        {!movieLoading && !movieError && movieData.length === 0 && (
          <p>No data available for movies.</p> 
        )}
        {!movieLoading && !movieError && movieData.length > 0 && (
          <Table headers={movieHeaders} data={movieData} />
        )}
      </div>
    </div>
  );
};

export default Home;
