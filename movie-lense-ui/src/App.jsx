import React, { useState, useEffect } from "react";
import Table from "./components/Table"; 
import Shimmer from "./components/Shimmer";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [endpoint, setEndpoint] = useState("movies");

  const endpoints = {
    movies: {
      url: "http://localhost:8080/api/movies",
      headers: ["Movie ID", "Title", "Genres", "Avg Rating", "Total Ratings"],
    },
    genres: {
      url: "http://localhost:8080/api/genres",
      headers: ["Genre", "Avg Rating", "Total Ratings"],
    },
    demographics: {
      url: "http://localhost:8080/api/demographics",
      headers: ["Age", "Gender", "Location", "Avg Rating", "Total Ratings"],
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(endpoints[endpoint].url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Metrics Data</h1>

      {/* Dropdown for selecting the endpoint */}
      <div className="mb-4">
        <label htmlFor="endpoint" className="mr-2 font-semibold">Select Endpoint:</label>
        <select
          id="endpoint"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          {Object.keys(endpoints).map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitalize endpoint */}
            </option>
          ))}
        </select>
      </div>

      {/* Display Loading, Error, or Table */}
      {loading && <Shimmer />} {/* Show shimmer loading when data is loading */}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && data.length > 0 && (
        <Table headers={endpoints[endpoint].headers} data={data} />
      )}
    </div>
  );
};

export default App;
