import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {ChartOptions, ChartData } from 'chart.js';
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
interface ChartOneProps {
  mainstock: string;
}
interface JsonDataItem {
  t: string;
  c: number; 
}

const ChartOne:React.FC<ChartOneProps> = ({mainstock}) => {
  const [jsonData, setJsonData] = useState<JsonDataItem[]>([]);

  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const dd = String(date.getDate()).padStart(2, '0');
  
  const formattedDate = `${yyyy}-${mm}-${dd}`;
  console.log(formattedDate);
const currentDate = new Date(formattedDate);
currentDate.setDate(currentDate.getDate() - 7);
const weekAgoYyyy = currentDate.getFullYear();
const weekAgoMm = String(currentDate.getMonth() + 1).padStart(2, '0');
const weekAgoDd = String(currentDate.getDate()).padStart(2, '0');
const weekAgoFormattedDate = `${weekAgoYyyy}-${weekAgoMm}-${weekAgoDd}`;

//week agoooooo
console.log(weekAgoFormattedDate);
currentDate.setMonth(currentDate.getMonth() - 1);

const monthAgoYyyy = currentDate.getFullYear();
const monthAgoMm = String(currentDate.getMonth() + 1).padStart(2, '0');
const monthAgoDd = String(currentDate.getDate()).padStart(2, '0');
const monthAgoFormattedDate = `${monthAgoYyyy}-${monthAgoMm}-${monthAgoDd}`;

//month agooooooo
console.log(monthAgoFormattedDate);


const yearAgoYyyy = currentDate.getFullYear()-1;
const yearAgoMm = String(currentDate.getMonth() + 1).padStart(2, '0');
const yearAgoDd = String(currentDate.getDate()).padStart(2, '0');
const yearAgoFormattedDate = `${yearAgoYyyy}-${yearAgoMm}-${yearAgoDd}`;

//year agoooooooo
console.log(yearAgoFormattedDate);

const [start_date,set_start_date]=useState(weekAgoFormattedDate)
  useEffect(() => {
    const getChart1 = async () => {
      try {
        const response = await axios.get(
          "https://api.polygon.io/v2/aggs/ticker/SPY/range/1/day/"+start_date+"/"+formattedDate+"?sort=asc&apiKey=oQ2SyGnp9cYRj0BQKrMHFLdplkp9kCtH"
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
  const maxPrice = Math.max(...jsonData.map((item) => item.c));
  const minPrice = Math.min(...jsonData.map((item) => item.c));

  const roundedMin = Math.floor(minPrice);
  const roundedMax = Math.ceil(maxPrice);

  const stepSizeY = (roundedMax - roundedMin) / 4; 

  const formatDate = (timestamp:string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
  };

  const chartData = {
    labels: jsonData.map((item) => formatDate(item.t)), 
    datasets: [
      {
        label: 'S&P 500',
        data: jsonData.map((item) => item.c), 
        borderColor: (context:any) => {
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

  const options:any= {
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
          title: (tooltipItems:any) => {
            return formatDate(jsonData[tooltipItems[0].dataIndex].t);
          },
          label: (tooltipItem:any) => {
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
          callback: (value:any) => `$${value}`,
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
        <button className="text-white text-xs bg-white bg-opacity-10 p-1 rounded h-1/2" onClick={()=>{set_start_date(weekAgoFormattedDate)}}>1W</button>
        <button className="text-white text-xs bg-white bg-opacity-10 p-1 rounded h-1/2" onClick={()=>{set_start_date(monthAgoFormattedDate)}}>1M</button>
        <button className="text-white text-xs bg-white bg-opacity-10 p-1 rounded h-1/2" onClick={()=>{set_start_date(yearAgoFormattedDate)}}>1Y</button>
        </div>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartOne;
