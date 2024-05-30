import PropTypes from "prop-types";

const SideBarMenuItem = ({ item }) => {
  return <li className="side-bar-menu-item-list">{item}</li>;
};

export default SideBarMenuItem;

SideBarMenuItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.object,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
