import React from "react";
import GenreChart from "./GenreChart";
import DemographicsChart from "./DemographicsChart";
import Table from "./Table";

const Home = ({ data, loading, error, endpoint }) => {
  return (
    <div className="space-y-8">
      {/* First div: Contains both charts */}
      <div className="space-y-8">
        {endpoint === "genres" && <GenreChart genres={data} />}
        {endpoint === "demographics" && <DemographicsChart data={data} />}
      </div>

      {/* Second div: Movies Table */}
      <div>
        {loading && <Shimmer />}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && data.length === 0 && (
          <p>No data available for this category.</p>
        )}
        {!loading && !error && data.length > 0 && endpoint !== "genres" && endpoint !== "demographics" && (
          <Table headers={["Movie ID", "Title", "Genres", "Avg Rating", "Total Ratings"]} data={data} />
        )}
      </div>
    </div>
  );
};

export default Home;
