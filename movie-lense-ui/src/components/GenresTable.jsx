import React from "react";
import Table from "./Table";

const GenresTable = ({ data }) => {
  const headers = ["Genre", "Avg Rating", "Total Ratings"];
  return <Table headers={headers} data={data} />;
};

export default GenresTable;
