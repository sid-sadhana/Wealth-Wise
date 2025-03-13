import Sidebar from "../components/Sidebar";
import ChartOne from "../components/ChartOne";

const Dashboard = () => {
  return (
    <div>
      <Sidebar>
        <div className="flex flex-row space-x-2 p-2 h-full">
        {/* <div className="border border-white bg-black w-6/12 h-64 p-4">
        
        </div> */}
        <div className="border border-white bg-white drop-shadow-none w-6/12 h-64 pr-4 pl-4 pt-6 pb-8 bg-opacity-10 rounded-xl border-opacity-10 transition-all duration-1000 shadow-transparent hover:shadow-gray-800 hover-drop-shadow-2xl shadow-md">
          <ChartOne mainstock="GOOG"/>
        </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default Dashboard;
