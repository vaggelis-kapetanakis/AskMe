import { useContext } from "react";
import Button from "../../ui/Button";
import { AuthContext } from "../../contexts/AuthContext";
import SIDEIMG from "../../assets/images/question.svg";
import { NavLink } from "react-router-dom";
import { BsHouse, BsPerson, BsPlusCircle } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa";

const Sidebar = () => {
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    authContext?.logout();
  };
  return (
    <aside className="w-[12%] bg-white/20 h-screen rounded-tr-xl rounded-br-xl p-5">
      <div className="flex flex-row items-center justify-between">
        <img src={SIDEIMG} alt="" className="w-20 h-20" />
        <h2 className="text-white text-3xl font-bold">AskMe</h2>
      </div>
      <div className="w-full h-[80%] pt-10 flex items-center justify-between flex-col">
        <div className="w-full flex items-center justify-center gap-y-5 flex-col">
          <NavLink
            to="/signedin"
            end
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-sky-500 bg-sky-700 w-full text-white outline-none cursor-pointer grid grid-cols-[0.1fr_0.9fr] gap-x-3 items-center rounded-2xl hover:text-sky-700 hover:bg-white/50 py-2 px-3 font-semibold"
                : "border-none bg-transparent w-full text-white outline-none cursor-pointer grid grid-cols-[0.1fr_0.9fr] gap-x-3 items-center rounded-2xl hover:text-sky-700 hover:bg-white/50 py-2 px-3 font-semibold"
            }
          >
            <BsHouse />
            Dashboard
          </NavLink>
          <NavLink
            to="/signedin/askquestion"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-sky-500 bg-sky-700 w-full text-white outline-none cursor-pointer grid grid-cols-[0.1fr_0.9fr] gap-x-3 items-center rounded-2xl hover:text-sky-700 hover:bg-white/50 py-2 px-3 font-semibold"
                : "border-none bg-transparent w-full text-white outline-none cursor-pointer grid grid-cols-[0.1fr_0.9fr] gap-x-3 items-center rounded-2xl hover:text-sky-700 hover:bg-white/50 py-2 px-3 font-semibold"
            }
          >
            <BsPlusCircle />
            Add a Question
          </NavLink>
          <NavLink
            to="/signedin/profile"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-sky-500 bg-sky-700 w-full text-white outline-none cursor-pointer grid grid-cols-[0.1fr_0.9fr] gap-x-3 items-center rounded-2xl hover:text-sky-700 hover:bg-white/50 py-2 px-3 font-semibold"
                : "border-none bg-transparent w-full text-white outline-none cursor-pointer grid grid-cols-[0.1fr_0.9fr] gap-x-3 items-center rounded-2xl hover:text-sky-700 hover:bg-white/50 py-2 px-3 font-semibold"
            }
          >
            <BsPerson />
            Profile
          </NavLink>
          <NavLink
            to="/signedin/charts"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-sky-500 bg-sky-700 w-full text-white outline-none cursor-pointer grid grid-cols-[0.1fr_0.9fr] gap-x-3 items-center rounded-2xl hover:text-sky-700 hover:bg-white/50 py-2 px-3 font-semibold"
                : "border-none bg-transparent w-full text-white outline-none cursor-pointer grid grid-cols-[0.1fr_0.9fr] gap-x-3 items-center rounded-2xl hover:text-sky-700 hover:bg-white/50 py-2 px-3 font-semibold"
            }
          >
            <FaChartLine />
            Charts
          </NavLink>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button
          buttonStyle={{
            color: "warning",
            rounded: "lg",
            size: "lg",
            vPadding: "sm",
          }}
          buttonVariant="solid"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
