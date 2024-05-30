import { Routes, Route } from "react-router-dom";
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Home from "./containers/Home";
import CreateContent from "./Pages/CreateContent";
import PageForm from "./containers/PageForm";
import PreviewContent from "./Pages/PreviewContent";
import PagesList from "./containers/PageList";
import EditPage from "./containers/EditPage";

const App = () => {
  const isInitiallyAuthenticated = localStorage.getItem("token") !== null; // Example check

  return (
    <AuthContextProvider value={{ isAuthenticated: isInitiallyAuthenticated }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Login />} />
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/pages" element={<PagesList />} />
          <Route path="/admin/pages/create" element={<PageForm />} />
          <Route path="/admin/edit-page/:id" element={<EditPage />} />
          <Route path="admin/block/create" element={<CreateContent />} />
          <Route path="admin/blocks" element={<PreviewContent />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
