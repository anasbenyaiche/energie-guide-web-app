import { Routes, Route } from "react-router-dom";
import Login from "./containers/Login";
import { AuthContextProvider } from "./context/AuthContext";
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
import ProtectedLayout from "./routes/ProtectedLayout";
import Layout from "./layout/layout";
import Dashboard from './Pages/Dashboard';
import FAQPage from "./Pages/FAQPage";
import BaseConPage from "./Pages/BaseConPage";
import ProcePage from "./Pages/ProcePage";
import AutocPage from "./Pages/AutocPage";
import NotFound from "./Pages/NotFound";
import SansTranPage from "./Pages/Autoconsommation/SansTranPage";

const App = () => {
  const isInitiallyAuthenticated = localStorage.getItem("token") !== null; // Example check

  return (
    <PagesProvider>
      <AuthContextProvider value={{ isAuthenticated: isInitiallyAuthenticated }}>
        <Routes>
          {/* Routes without sidebar */}
          <Route path="/" element={<Layout showSidebar={false}><Home /></Layout>} />
          <Route path="/faq" element={<Layout showSidebar={false}><FAQPage /></Layout>} />
          <Route path="/base_de_connaissance" element={<Layout showSidebar={false}><BaseConPage /></Layout>} />
          <Route path="/procedure" element={<Layout showSidebar={false}><ProcePage /></Layout>} />
          <Route path="/autoconsommation" element={<Layout showSidebar={false}><AutocPage /></Layout>} />
          <Route path="/autoconsommation/sans_transport" element={<Layout showSidebar={false}><SansTranPage /></Layout>} />
          <Route path="/admin" element={<Login />} />

          {/* Protected routes with sidebar */}
          <Route element={<ProtectedLayout showSidebar={true} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/:link" element={<AppContainer />} />
            <Route path="/admin/pages" element={<Pages />} />
            <Route path="/admin/pages/create" element={<PageForm />} />
            <Route path="/admin/menus" element={<Menus />} />
            <Route path="/admin/edit-page/:id" element={<EditPage />} />
            <Route path="/admin/:pageId/block/create" element={<CreateBlock />} />
            <Route path="/admin/:pageId/blocks" element={<BlocksPage />} />
            <Route path="/admin/menu-item" element={<MenuItems />} />
            <Route path="/admin/menu-item/create" element={<MenuItemForm />} />
            <Route path="/admin/edit-menu-item/:id" element={<EditMenuItemForm />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContextProvider>
    </PagesProvider>
  );
};

export default App;
