import "./layout.css";
import SideBarMenu from "./Sidebar/SideBarMenu";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import PropTypes from "prop-types";
import AdminSidebar from "./AdminSidebar/AdminSidebar";

const Layout = ({ children, showSidebar }) => {
  return (
    <div className={` ${showSidebar ? 'body-container' : 'w-full'} `}>
      {showSidebar && <Breadcrumb />}
      <div className={`grid ${showSidebar ? 'grid-cols-4' : 'grid-cols-1'}`}>
        {showSidebar && (
          <div className="col-span-1 side-block">
            <SideBarMenu />
          </div>
        )}
        <div className={`${showSidebar ? 'col-span-3' : 'col-span-1'} bg-light h-full bg-white`}>
          {children}
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
