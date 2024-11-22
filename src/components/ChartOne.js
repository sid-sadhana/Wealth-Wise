import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const ChartOne = ({mainstock}) => {
  const [jsonData, setJsonData] = useState([]);

  // Fetch data
  useEffect(() => {
    const getChart1 = async () => {
      try {
        const response = await axios.get(
          "https://api.polygon.io/v2/aggs/ticker/SPY/range/1/day/2023-03-01/2023-03-24?sort=asc&apiKey=oQ2SyGnp9cYRj0BQKrMHFLdplkp9kCtH"
        );
        setJsonData(response.data.results);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    getChart1();
  }, []);

  if (jsonData.length === 0) {
    return <div>Loading chart...</div>;
  }

  // Calculate max and min prices dynamically
  const maxPrice = Math.max(...jsonData.map((item) => item.c));
  const minPrice = Math.min(...jsonData.map((item) => item.c));

  // Round min and max prices for cleaner results
  const roundedMin = Math.floor(minPrice);
  const roundedMax = Math.ceil(maxPrice);

  // Calculate step size to ensure 5 ticks
  const stepSizeY = (roundedMax - roundedMin) / 4; // Divide into 4 intervals for 5 ticks

  // Format date for x-axis
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
  };

  // Define chart data
  const chartData = {
    labels: jsonData.map((item) => formatDate(item.t)), // Display dates
    datasets: [
      {
        label: 'S&P 500',
        data: jsonData.map((item) => item.c), // Use closing prices
        borderColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
          gradient.addColorStop(0, 'rgba(75, 192, 192, 1)');
          gradient.addColorStop(1, 'rgba(192, 75, 192, 1)');
          return gradient;
        },
        backgroundColor: 'transparent',
        borderWidth: 2,
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  // Define chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#31363F',
        mode: 'index',
        displayColors: false,
        intersect: false,
        callbacks: {
          title: (tooltipItems) => {
            return formatDate(jsonData[tooltipItems[0].dataIndex].t);
          },
          label: (tooltipItem) => {
            return `Price: $${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: true,
    },
    scales: {
      // X-axis configuration
      x: {
        grid: {
          display: false, // Show grid for X-axis
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          maxRotation: 0,
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: 5
        },
        title: {
          display: false,
        },
      },

      // Y-axis configuration
      y: {
        grid: {
          display: false, // Show grid for Y-axis
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          callback: (value) => `$${value}`,
          padding: 0,
          stepSize: Math.ceil(stepSizeY), // Use stepSizeY to make sure we have 5 ticks
          maxTicksLimit: 5, // Limit to 5 ticks only
        },
        title: {
          display: false,
          text: '',
          color: '#ffffff',
          padding: 0,
        },
        min: roundedMin, // Use the floored min price
        max: roundedMax, // Use the ceiled max price
      },
    },
  };

  return (
    <div className="h-full w-full pb-1">
      <div className="flex flex-row justify-between -mt-4">
        <h1 className=" text-white text-md mb-6">{mainstock}</h1>
        <div className="flex space-x-4">
        <button className="text-white text-xs bg-white bg-opacity-10 p-1 rounded h-1/2">1W</button>
        <button className="text-white text-xs bg-white bg-opacity-10 p-1 rounded h-1/2">1M</button>
        <button className="text-white text-xs bg-white bg-opacity-10 p-1 rounded h-1/2">1Y</button>
        </div>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartOne;
