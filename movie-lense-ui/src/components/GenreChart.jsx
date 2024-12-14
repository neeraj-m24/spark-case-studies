import React from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import DemographicsChart from "./DemographicsChart";

const GenreChart = ({ genres }) => {
  // Prepare chart data
  const data = {
    labels: genres.map(genre => genre.genre), // Genre names as labels
    datasets: [
      {
        label: "Avg Rating",
        data: genres.map(genre => genre.avgRating), // Avg Ratings
        backgroundColor: 'rgba(75,192,192,0.2)', // Light Blue for the bars
        borderColor: 'rgba(75,192,192,1)', // Darker blue for the border
        borderWidth: 1,
        yAxisID: 'y1', // Link this dataset to the second Y-axis (Avg Rating)
      },
      {
        label: "Total Ratings",
        data: genres.map(genre => genre.totalRatings), // Total Ratings
        backgroundColor: 'rgba(255,99,132,0.2)', // Light Red for the bars
        borderColor: 'rgba(255,99,132,1)', // Darker red for the border
        borderWidth: 1,
        yAxisID: 'y2', // Link this dataset to the first Y-axis (Total Ratings)
      },
    ],
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Genre Ratings Comparison</h2>
      <DemographicsChart/>
      <div style={{ height: "400px" }}>
        <Bar data={data} options={{
          responsive: true,
          scales: {
            y1: {
              beginAtZero: true,
              position: 'left', // Place the Avg Rating axis on the left
              ticks: {
                max: 5, // Set a maximum value for Avg Rating axis
                min: 0,  // Set a minimum value for Avg Rating axis
              },
            },
            y2: {
              beginAtZero: true,
              position: 'right', // Place the Total Ratings axis on the right
              ticks: {
                max: Math.max(...genres.map(genre => genre.totalRatings)), // Dynamic max for Total Ratings
              },
            },
          },
        }} />
      </div>
    </div>
  );
};

export default GenreChart;
