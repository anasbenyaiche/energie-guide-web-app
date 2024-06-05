import { createContext, useState, useEffect } from "react";
import api from "../api/api";

const PagesContext = createContext(null);

export const PagesProvider = ({ children }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchAllPages = async () => {
      try {
        const response = await api.get("/pages");
        setPages(response.data);
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };

    fetchAllPages();
  }, []);

  return (
    <PagesContext.Provider value={{ pages }}>{children}</PagesContext.Provider>
  );
};

export default PagesContext;
