import { Routes, Route } from "react-router-dom";
import Login from "./containers/Login";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoutes";
import PageForm from "./containers/PageForm";
import EditPage from "./containers/EditPage";
import Pages from "./Pages/Pages";
import MenuItemForm from "./containers/MenuForm";
import MenuItems from "./Pages/MenuItem";
import BlocksPage from "./Pages/BlocksPage";
import CreateBlock from "./Pages/CreateBlock";
import AppContainer from "./containers/AppContainer";
import { PagesProvider } from "./context/PageContext";
import Home from "./containers/Home";
import EditMenuItemForm from "./containers/EditMenuForm";
import Menus from "./Pages/Menus";
import { AdminProivder } from "./context/AdminContext";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./containers/Navbar/Navbar";
import Searchbar from "./containers/Searchbar/Searchbar";

const App = () => {
  const isInitiallyAuthenticated = localStorage.getItem("token") !== null; // Example check

  return (
    <PagesProvider>
      <AuthContextProvider
        value={{ isAuthenticated: isInitiallyAuthenticated }}
      >
        <AdminProivder>
          <Navbar />
          <Searchbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:link" element={<AppContainer />} />
            <Route path="/admin" element={<Login />} />

            <Route exact path="/" element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/pages" element={<Pages />} />
              <Route path="/admin/pages/create" element={<PageForm />} />
              <Route path="/admin/menus" element={<Menus />} />
              <Route path="/admin/edit-page/:id" element={<EditPage />} />
              <Route
                path="/admin/:pageId/block/create"
                element={<CreateBlock />}
              />
              <Route path="/admin/:pageId/blocks" element={<BlocksPage />} />
              <Route path="/admin/menu-item" element={<MenuItems />} />
              <Route
                path="/admin/menu-item/create"
                element={<MenuItemForm />}
              />
              {/* TODO : still working on */}
              <Route
                path="/admin/edit-menu-item/:id"
                element={<EditMenuItemForm />}
              />
            </Route>
          </Routes>
        </AdminProivder>
      </AuthContextProvider>
    </PagesProvider>
  );
};

export default App;
