import "./layout.css";
import SideBarMenu from "./Sidebar/SideBarMenu";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import PropTypes from "prop-types";
import Header from "./Header/Header";
import FooterE from "./Footer/FooterE";
import { useLocation } from "react-router-dom";
import MenuPage from "../components/MenuPages/MenuPage";

const Layout = ({ children, showSidebar }) => {

  const location = useLocation();
  const rowPage = location.pathname === '/faq';
  return (
    <>
      <Header />
      <div className="w-full dash-content">
        {rowPage && <MenuPage />}
        <div className={` ${showSidebar ? 'row' : 'w-full'} ${rowPage ? 'bg-white' : ''}`}>
          <div className={`grid ${showSidebar ? 'grid-cols-4' : 'grid-cols-1'}`}>
            {showSidebar && (
              <div className="col-span-1 p-5">
                <SideBarMenu />
              </div>)}
            <div className={`${rowPage ? 'row' : ''}  ${showSidebar ? 'col-span-3' : 'col-span-1'} bg-light h-full bg-white`}>
              {showSidebar && <Breadcrumb />}
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
