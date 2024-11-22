import Sidebar from "../components/Sidebar";
import ChartOne from "../components/ChartOne";

const Dashboard = () => {
  return (
    <div>
      <Sidebar>
        <div className="flex flex-row space-x-2 p-2 h-full">
        <div className="border border-white bg-black w-6/12 h-64 p-4">
        
        </div>
        <div className="border border-white bg-white w-6/12 h-64 pr-4 pl-4 pt-6 pb-8 bg-opacity-10 rounded-xl border-opacity-20">
          <ChartOne mainstock="S&P500"/>
        </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default Dashboard;
