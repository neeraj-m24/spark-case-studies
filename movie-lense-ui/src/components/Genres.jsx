import React from 'react'
import { useState, useEffect } from 'react';
import Shimmer from './Shimmer';
import Table from './Table';

const Genres = () => {
    const url = "http://localhost:8080/api/genres"; // Properly declare `url`
    const headers = ["Genre", "Avg Rating", "Total Ratings"]
  
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const json = await response.json();
          setData(json);
          console.log("Fetched data:", json); // Debug log
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [url]);
  
    return (
      <>
        {loading && <Shimmer/>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && data.length > 0 && <Table data={data} headers={headers} />}
        {!loading && !error && data.length === 0 && <p>No data available.</p>}
      </>
    );
}

export default Genres