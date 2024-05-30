import "./SideBarMenu.css";
import SideBarMenuItem from "./SideBarMenuItem";
import SideBarMenuTitle from "./SideBarMenuTitle";

const navMenuItems = [
  "Context énergétique",
  "Cadre règlementaire",
  "Acteur des énergies renouvelables Tunisie",
  "Processus de développement des projets d'énergies renouvelables",
  "Environnement d'investissement et cadre incitatif en faveur des énergies renouvelables",
  "Resources documentaires",
];

const SideBarMenu = () => {
  return (
    <div className="side-bar-menu ">
      <SideBarMenuTitle
        title={"PROJETS D’ÉNERGIE RENOUVELABLE EN TUNISIE :"}
        subtitle={"Guide Détaillé"}
      />
      <ul className="side-bar-menu-list">
        {navMenuItems.map((menuItem) => (
          <SideBarMenuItem key={menuItem} item={menuItem} />
        ))}
      </ul>
      <div className="line"></div>
    </div>
  );
};

export default SideBarMenu;
