import { createContext, useState } from "react";

const AdminContext = createContext(null);

const AdminProivder = ({ children }) => {
  const [isAdminSidebarOpen, setIsAdminSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsAdminSidebarOpen(!setIsAdminSidebarOpen);
  };

  const value = {
    isAdminSidebarOpen,
    setIsAdminSidebarOpen,
    toggleSidebar,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export { AdminContext, AdminProivder };
