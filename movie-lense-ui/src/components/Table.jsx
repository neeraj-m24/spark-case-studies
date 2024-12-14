import React from "react";

const Table = ({ headers, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border border-gray-300 px-4 py-2 bg-gray-200"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="even:bg-gray-100">
              {headers.map((header, cellIndex) => {
                const key = header
                  .toLowerCase()
                  .replace(/\s+/g, "")
                  .replace(/[^a-z0-9]/gi, ""); // Normalize header to match data keys
                return (
                  <td
                    key={cellIndex}
                    className="border border-gray-300 px-4 py-2 text-center"
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
