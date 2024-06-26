import { useState, useEffect } from "react";
import api from "../../api/api";
import "./SideBarMenu.css";
import SideBarMenuItem from "./SideBarMenuItem";
import SideBarMenuTitle from "./SideBarMenuTitle";
import { getQueryMenu } from "../../services/menuService";

const SideBarMenu = () => {
  const [sideBarMenu, setSideBarMenu] = useState([]);

  useEffect(() => {
    const fetchSideBarMenu = async () => {
      try {
        const response = await getQueryMenu("placement=sidebar");
        setSideBarMenu(response);
      } catch (err) {
        console.error("Failed to fetch nav menu items", err);
      }
    };

    fetchSideBarMenu();
  }, []);

  return (
    <div className="side-bar-menu">
      <SideBarMenuTitle
        title={sideBarMenu?.menu?.title}
        subtitle={sideBarMenu?.menu?.subtitle}
      />
      <ul className="side-bar-menu-list">
        {sideBarMenu?.menuItems?.map((menuItem) => (
          <SideBarMenuItem key={menuItem._id} item={menuItem} />
        ))}
      </ul>
      <div className="line"></div>
    </div>
  );
};

export default SideBarMenu;
