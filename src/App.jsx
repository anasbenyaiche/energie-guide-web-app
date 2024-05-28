import { Routes, Route } from "react-router-dom";
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Home from "./containers/Home";
import Edit from "./Pages/Edit";
import PageForm from "./containers/PageForm";
import PreviewContent from "./Pages/PreviewContent";

const App = () => {
  const isInitiallyAuthenticated = localStorage.getItem("token") !== null; // Example check

  return (
    <AuthContextProvider value={{ isAuthenticated: isInitiallyAuthenticated }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/blocks" element={<PreviewContent />} />
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route path="/admin/pages" element={<PageForm />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
