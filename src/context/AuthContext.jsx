import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

// eslint-disable-next-line react/prop-types
const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") !== null // Initial check based on local storage
  );

  useEffect(() => {
    // Optional: Implement logic to check token validity on app load (e.g., API call)
    // Update setIsAuthenticated based on the validity check
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token); // Store token in local storage
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
