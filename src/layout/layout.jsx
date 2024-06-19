import "./layout.css";
import SideBarMenu from "./Sidebar/SideBarMenu";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import PropTypes from "prop-types";
import AdminSidebar from "./AdminSidebar/AdminSidebar";

const Layout = ({ children }) => {
  return (
    <div className="body-container">
      <Breadcrumb />
      <div className="container  ">
        <AdminSidebar />
        <div className="grid grid-cols-4 ">
          <div className="col-span-1 side-block">
            <SideBarMenu />
          </div>
          <div className="col-span-3 bg-light  h-full bg-white ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
