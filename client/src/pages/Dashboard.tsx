import Sidebar from "../components/Sidebar";
import ChartOne from "../components/ChartOne";
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [news, set_news] = useState([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const get_news = async () => {
    const response: any = await axios.get('http://localhost:5500/api/jwtauth/getnews');
    set_news(response.data["message"]["top_stories"]);
  };

  useEffect(() => {
    get_news();

    const interval = setInterval(() => {
      const container = scrollContainerRef.current;

      if (container) {
        const stepSize = container.scrollHeight / 10; 
        if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
          container.scrollTop = 0; 
        } else {
          container.scrollBy({ top: stepSize, behavior: 'smooth' }); 
        }
      }
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Sidebar>
        <div className="flex flex-row space-x-2 p-2 h-full">
          <div className="border border-white bg-white drop-shadow-none w-8/12 h-3/6 pr-4 pl-4 pt-6 pb-8 bg-opacity-10 rounded-xl border-opacity-10 transition-all duration-1000 shadow-transparent hover:shadow-gray-800 hover-drop-shadow-2xl shadow-md">
            <ChartOne mainstock="GOOG" />
          </div>
          <div
            ref={scrollContainerRef}
            className="overflow-y-auto flex flex-col items-center space-y-4 border border-gray-300 bg-white bg-opacity-10 drop-shadow-none w-4/12 h-3/6 pr-4 pl-4 pt-6 pb-8 rounded-xl border-opacity-10 transition-all duration-1000 shadow-transparent hover:shadow-gray-800 hover-drop-shadow-2xl shadow-md"
          >
            {news.map((price: any, index) => (
              <Link
                to={price.link}
                key={index}
                className="bg-black bg-opacity-20 overflow-ellipsis flex h-28 border-l border-r border-t border-b border-l-teal-200 border-b-teal-200 border-t-violet-300 border-r-violet-300 w-11/12 p-4 drop-shadow-2xl rounded-lg hover:scale-105 transition-all duration-300 hover:border-r-teal-200 hover:border-t-teal-200 hover:border-b-violet-300 hover:border-l-violet-300"
              >
                <img src={price.thumbnail} className="h-full mb-2 mr-4 rounded" />
                <h1 className="text-white text-sm mr-4">{price.title}</h1>
                <div className="flex flex-col gap-3 overflow-ellipsis">
                  <p className="text-gray-400 text-xs">{price.source}</p>
                  <p className="text-gray-400 text-xs">{price.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default Dashboard;
