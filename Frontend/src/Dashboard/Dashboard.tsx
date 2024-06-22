import Main from "./Main/Main";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="w-screen h-screen bg-dashboard-bg flex justify-between pr-10">
      <Sidebar />
      <div className="w-[86%] h-full grid grid-rows-[0.05fr_0.95fr] gap-y-8">
        <Navbar />
        <div className="backdrop-blur-md bg-white/20 rounded-xl h-full relative">
          <Main />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
