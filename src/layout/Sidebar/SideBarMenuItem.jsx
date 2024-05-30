import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SideBarMenuItem = ({ item }) => {
  return (
    <li className="side-bar-menu-item-list">
      <Link className="text-white" to={item.link}>
        {item.title}
      </Link>
    </li>
  );
};

export default SideBarMenuItem;

SideBarMenuItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.object,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};
