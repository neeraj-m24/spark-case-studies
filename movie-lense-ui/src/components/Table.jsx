// import React from "react";

// // Define the header-to-data key mapping
// const headerKeyMap = {
//   "Movie ID": "movieId",
//   Title: "title",
//   Genres: "genres",
//   "Avg Rating": "avgRating",
//   "Total Ratings": "totalRatings",
//   Genre: "genre",
//   Age: "age",
//   Gender: "gender",
//   Location: "location",
// };

// const Table = ({ headers, data }) => {
//   return (
//     <div
//       className="overflow-x-auto overflow-y-auto max-h-[50vh] border border-gray-200 shadow-xl"
//       style={{margin: "0 auto" }}
//     >
//       <table className="table-auto border-collapse w-full">
//         <thead>
//           <tr>
//             {headers.map((header, index) => (
//               <th
//                 key={index}
//                 className="border border-gray-300 px-4 py-2 bg-gray-50 text-center"
//               >
//                 {header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, index) => (
//             <tr key={index}>
//               {headers.map((header, cellIndex) => {
//                 const key = headerKeyMap[header]; // Map the header to the data key
//                 return (
//                   <td
//                     key={cellIndex}
//                     className="border border-gray-300 px-4 py-2 text-center"
//                   >
//                     {row[key] || "-"}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;

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
      className="overflow-x-auto overflow-y-auto max-h-[50vh] border border-gray-200 shadow-xl"
      style={{ margin: "0 auto" }}
    >
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="border-b border-gray-300 px-4 py-2 bg-gray-50 text-center"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="even:bg-gray-50">
              {headers.map((header, cellIndex) => {
                const key = headerKeyMap[header]; // Map the header to the data key
                return (
                  <td
                    key={cellIndex}
                    className="border-b border-gray-300 px-4 py-2 text-center"
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
