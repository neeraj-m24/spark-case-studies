import React from "react";
import Table from "./Table";

const DemographicsTable = ({ data }) => {
  const headers = ["Age", "Gender", "Location", "Avg Rating", "Total Ratings"];
  return <Table headers={headers} data={data} />;
};

export default DemographicsTable;
