import React from "react";
import Table from "./Table";

const MoviesTable = ({ data }) => {
  const headers = ["Movie ID", "Title", "Genres", "Avg Rating", "Total Ratings"];
  return <Table headers={headers} data={data} />;
};

export default MoviesTable;
