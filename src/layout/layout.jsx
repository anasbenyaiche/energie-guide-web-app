import "./layout.css";
import SideBarMenu from "./Sidebar/SideBarMenu";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import PropTypes from "prop-types";
import AdminSidebar from "./AdminSidebar/AdminSidebar";

const Layout = ({ children }) => {
  return (
    <div className="body-container">
      {/* <Breadcrumb /> */}
      <div className="container ">
        <AdminSidebar />
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
