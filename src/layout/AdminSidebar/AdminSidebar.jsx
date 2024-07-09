import React, { useContext, useState } from "react";
import { NavLink, useMatch } from "react-router-dom";
import { FaFileAlt, FaBars, FaListUl, FaChessBoard } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { AdminContext } from "../../context/AdminContext";

const AdminSidebar = ({ children }) => {
  const { isAdminSidebarOpen, toggleSidebar, setIsAdminSidebarOpen } =
    useContext(AdminContext);
  const { isAuthenticated } = useContext(AuthContext);
  const match = useMatch("/admin/*");

  console.log(isAdminSidebarOpen);

  if (!isAuthenticated) {
    return null;
  }
  if (!match) {
    return null;
  }

  return (
    <div>
      <div
        className={`fixed z-50 inset-y-0 right-0 transform ${
          !isAdminSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out bg-gray-800 text-white w-20`}
      >
        <div className="flex justify-between items-center p-4">
          <button
            className="text-black"
            onClick={() => setIsAdminSidebarOpen(!isAdminSidebarOpen)}
          >
            <FaBars />
          </button>
        </div>
      </div>
      <div
        className={`fixed z-50 inset-y-0 right-0 transform ${
          isAdminSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out bg-gray-800 text-white w-50`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-bold">Admin</h2>
          <button className="text-black" onClick={toggleSidebar}>
            ✕
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <NavLink
            to="/admin/dashboard"
            className="flex items-center p-2 rounded hover:bg-gray-700"
            activeClassName="bg-gray-700"
          >
            <FaChessBoard className="mr-3" /> Dashboard
          </NavLink>
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
            to="/admin/menu-item"
            className="flex items-center p-2 rounded hover:bg-gray-700"
            activeClassName="bg-gray-700"
          >
            <FaListUl className="mr-3" /> Menu Items
          </NavLink>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default AdminSidebar;
