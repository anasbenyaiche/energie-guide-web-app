import { FaBars, FaFileAlt, FaListUl } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const DashboardContainer = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className=" mb-4">
        <h2 className="text-2xl font-bold ml-5">Dashboard</h2>

        <nav className="flex flex-col p-4 space-y-2">
          <NavLink
            to="/admin/pages"
            className="flex items-center p-2 rounded hover:bg-gray-700 hover:text-white"
          >
            <FaFileAlt className="mr-3" /> Pages
          </NavLink>
          <NavLink
            to="/admin/menus"
            className="flex items-center p-2 rounded hover:bg-gray-700 hover:text-white"
          >
            <FaBars className="mr-3" /> Menus
          </NavLink>
          <NavLink
            to="/admin/menu-item"
            className="flex items-center p-2 rounded hover:bg-gray-700 hover:text-white"
          >
            <FaListUl className="mr-3" /> Menu Items
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default DashboardContainer;
