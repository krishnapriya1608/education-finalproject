import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyProgressChart = () => {
  const chartRef = useRef(null);

  // Chart data
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Progress",
        data: [20, 40, 60, 70, 80, 90],
        borderColor: "#5090c0",
        backgroundColor: (context) => {
          const chart = chartRef.current;
          const ctx = chart?.ctx;

          if (!ctx) return "rgba(80, 144, 192, 0.2)";

          // Create gradient
          const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
          gradient.addColorStop(0, "rgba(80, 144, 192, 0.8)"); // Blue at the top
          gradient.addColorStop(1, "rgba(255, 255, 255, 0.5)"); // White at the bottom

          return gradient;
        },
        pointBackgroundColor: "#5090c0",
        tension: 0.4, // For smooth curves
        fill: true, // Enables area fill under the line
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hides grid lines for X-axis
        },
      },
      y: {
        grid: {
          color: "#f0f0f0", // Light grid lines for Y-axis
        },
      },
    },
  };

  return (
    <div style={{ height: "200px", width: "400px" }}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default MonthlyProgressChart;
