import { NAV_MENU_ITEMS } from "../../constants/MainPageLinks";
import "./SideBarMenu.css";
import SideBarMenuItem from "./SideBarMenuItem";
import SideBarMenuTitle from "./SideBarMenuTitle";

const SideBarMenu = () => {
  return (
    <div className="side-bar-menu ">
      <SideBarMenuTitle
        title={"PROJETS D’ÉNERGIE RENOUVELABLE EN TUNISIE :"}
        subtitle={"Guide Détaillé"}
      />
      <ul className="side-bar-menu-list">
        {NAV_MENU_ITEMS.map((menuItem) => (
          <SideBarMenuItem key={menuItem} item={menuItem} />
        ))}
      </ul>
      <div className="line"></div>
    </div>
  );
};

export default SideBarMenu;
