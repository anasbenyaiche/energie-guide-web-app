import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaFileAlt, FaBars, FaListUl, FaThLarge } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div
      className={`fixed z-50 inset-y-0 right-0 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out bg-gray-800 text-white w-64`}
    >
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-bold">Admin</h2>
        <button className="text-black" onClick={toggleSidebar}>
          ✕
        </button>
      </div>
      <nav className="flex flex-col p-4 space-y-2">
        <NavLink
          to="/admin/pages"
          className="flex items-center p-2 rounded hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          <FaFileAlt className="mr-3" /> Pages
        </NavLink>
        <NavLink
          to="/admin/menus"
          className="flex items-center p-2 rounded hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          <FaBars className="mr-3" /> Menus
        </NavLink>
        <NavLink
          to="/admin/menu-items"
          className="flex items-center p-2 rounded hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          <FaListUl className="mr-3" /> Menu Items
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
