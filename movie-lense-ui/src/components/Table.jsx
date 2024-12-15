import React from "react";

// Define the header-to-data key mapping
const headerKeyMap = {
  "Movie ID": "movieId",
  Title: "title",
  Genres: "genres",
  "Avg Rating": "avgRating",
  "Total Ratings": "totalRatings",
  Genre: "genre",
  Age: "age",
  Gender: "gender",
  Location: "location",
};

const Table = ({ headers, data }) => {
  return (
    <div
      className="overflow-x-auto overflow-y-auto max-h-[50vh] border border-gray-200 shadow-lg rounded-lg"
      style={{ margin: "0 auto" }}
    >
      <table className="table-auto border-collapse w-full">
        <thead className="sticky top-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border-b border-gray-300 px-4 py-3 text-center font-semibold uppercase tracking-wide text-sm"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="even:bg-gray-50 odd:bg-white">
              {headers.map((header, cellIndex) => {
                const key = headerKeyMap[header]; // Map the header to the data key
                return (
                  <td
                    key={cellIndex}
                    className="border-b border-gray-300 px-4 py-2 text-center text-sm"
                  >
                    {row[key] || "-"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
