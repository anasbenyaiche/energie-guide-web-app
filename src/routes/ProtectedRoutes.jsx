import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // Get authentication state

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // Redirect to login on unauthenticated access
  }

  return children || <Outlet />; // Render children or Outlet (nested routes)
};

export default ProtectedRoute;
