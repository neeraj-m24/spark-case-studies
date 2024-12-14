// import React from 'react';
// import { Radar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, RadialLinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   RadialLinearScale,  // Correct scale for radar chart
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const data = [
//   { age: 36, avgRating: 3.97, gender: 'Male', location: 'East Bernieburgh', totalRatings: 3 },
//   { age: 50, avgRating: 3.37, gender: 'Male', location: 'Shirleyton', totalRatings: 3 },
//   { age: 66, avgRating: 3.2, gender: 'Non-Binary', location: 'Rauberg', totalRatings: 1 },
//   { age: 30, avgRating: 3.15, gender: 'Non-Binary', location: 'Schuliststad', totalRatings: 2 },
//   { age: 64, avgRating: 2.7, gender: 'Non-Binary', location: 'Port Miltonview', totalRatings: 2 },
//   { age: 69, avgRating: 2.5, gender: 'Non-Binary', location: 'West Angelicamouth', totalRatings: 3 },
//   { age: 43, avgRating: 2.4, gender: 'Non-Binary', location: 'Cristystad', totalRatings: 2 },
//   { age: 52, avgRating: 2.1, gender: 'Female', location: 'Nicolasfurt', totalRatings: 1 },
//   { age: 57, avgRating: 2.0, gender: 'Female', location: 'Giovannashire', totalRatings: 1 },
//   { age: 58, avgRating: 1.25, gender: 'Female', location: 'Port Gil', totalRatings: 2 },
// ];

// const DemographicsChart = () => {
//   const groupedByAge = data.reduce((acc, item) => {
//     if (!acc[item.age]) {
//       acc[item.age] = [];
//     }
//     acc[item.age].push(item);
//     return acc;
//   }, {});

//   const chartData = {
//     labels: ['Male', 'Female', 'Non-Binary'],
//     datasets: [
//       {
//         label: 'Age 30-40',
//         data: [3.5, 3.0, 3.2], // Custom data points, adjust accordingly
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
//       },
//       {
//         label: 'Age 40-50',
//         data: [3.1, 3.3, 2.8], // Custom data points, adjust accordingly
//         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       title: {
//         display: true,
//         text: 'Radar Chart: Average Ratings by Age and Gender',
//         font: { size: 20 },
//       },
//     },
//   };

//   return (
//     <div style={{ width: '80%', margin: '0 auto', paddingTop: '20px' }}>
//       <Radar data={chartData} options={chartOptions} />
//     </div>
//   );
// };

// export default DemographicsChart;


import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, RadialLinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,  // Correct scale for radar chart
  PointElement,
  Title,
  Tooltip,
  Legend
);

const DemographicsChart = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available to display the chart.</p>;
  }

  // Group data by age range (for example: 30-40, 40-50, etc.)
  const groupedByAge = data.reduce((acc, item) => {
    const ageRange = `${Math.floor(item.age / 10) * 10}-${Math.floor(item.age / 10) * 10 + 9}`;
    if (!acc[ageRange]) {
      acc[ageRange] = [];
    }
    acc[ageRange].push(item);
    return acc;
  }, {});

  // Function to calculate the average rating per gender for each age group
  const calculateAvgRating = (ageRange, gender) => {
    const group = groupedByAge[ageRange]?.filter(item => item.gender === gender);
    if (!group || group.length === 0) return 0;
    const avgRating = group.reduce((sum, item) => sum + item.avgRating, 0) / group.length;
    return avgRating;
  };

  // Prepare chart data
  const chartData = {
    labels: Object.keys(groupedByAge),  // Age ranges as labels (e.g. '30-39', '40-49')
    datasets: [
      {
        label: 'Male',
        data: Object.keys(groupedByAge).map(ageRange => calculateAvgRating(ageRange, 'Male')),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Female',
        data: Object.keys(groupedByAge).map(ageRange => calculateAvgRating(ageRange, 'Female')),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Non-Binary',
        data: Object.keys(groupedByAge).map(ageRange => calculateAvgRating(ageRange, 'Non-Binary')),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Radar Chart: Average Ratings by Age and Gender',
        font: { size: 20 },
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', paddingTop: '20px' }}>
      <Radar data={chartData} options={chartOptions} />
    </div>
  );
};

export default DemographicsChart;
