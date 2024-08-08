import "./layout.css";
import SideBarMenu from "./Sidebar/SideBarMenu";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import PropTypes from "prop-types";
import Header from "./Header/Header";
import FooterE from "./Footer/FooterE";
import FixedIcons from "../components/FixedIcons/FixedIcons";

const Layout = ({ children, showSidebar }) => {

  return (
    <>
      <Header />
      {!showSidebar && <FixedIcons />}
      <div className="w-full dash-content">
        {showSidebar && <Breadcrumb />}
        <div className={` ${showSidebar ? 'row' : 'w-full'}`}>
          <div className={`grid ${showSidebar ? 'grid-cols-4' : 'grid-cols-1'}`}>
            {showSidebar && (
              <div className="col-span-1 p-5">
                <SideBarMenu />
              </div>)}
            <div className={`${showSidebar ? 'col-span-3' : 'col-span-1'} bg-light h-full bg-white`}>

              {children}
            </div>
          </div>
        </div>
      </div>
      {showSidebar && <div className="w-full h-10 bg-[#0D335F]" />}
      <FooterE />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
