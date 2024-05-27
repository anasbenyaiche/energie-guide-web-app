import { Routes, Route } from "react-router-dom";
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Home from "./containers/Home";

const App = () => {
  const isInitiallyAuthenticated = localStorage.getItem("token") !== null; // Example check

  return (
    <AuthContextProvider value={{ isAuthenticated: isInitiallyAuthenticated }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Login />} />
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
