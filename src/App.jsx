import { Routes, Route } from "react-router-dom";
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Home from "./containers/Home";
import Edit from "./Pages/Edit";
import PageForm from "./containers/PageForm";
import EditPage from "./containers/EditPage";
import Pages from "./Pages/Pages";
import MenuItemForm from "./containers/MenuForm";
import MenuItems from "./Pages/MenuItem";

const App = () => {
  const isInitiallyAuthenticated = localStorage.getItem("token") !== null; // Example check

  return (
    <AuthContextProvider value={{ isAuthenticated: isInitiallyAuthenticated }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/edit" element={<Edit />} />

        <Route exact path="/" element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/pages" element={<Pages />} />
          <Route path="/admin/pages/create" element={<PageForm />} />
          <Route path="/admin/edit-page/:id" element={<EditPage />} />
          <Route path="/admin/menu-item" element={<MenuItems />} />
          <Route path="/admin/menu-item/create" element={<MenuItemForm />} />
          {/* TODO : still working on */}
          <Route path="/admin/edit-menu-item/:id" element={<MenuItemForm />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
