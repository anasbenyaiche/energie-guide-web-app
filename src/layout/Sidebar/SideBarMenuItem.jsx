import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

const SideBarMenuItem = ({ item }) => {
  const location = useLocation();
  const isActive = location.pathname === item.link;
  return (
    <li className="text-sm font-medium mb-3">
      <Link className={`arrow-text flex items-center  w-full p-2  ${isActive ? "text-[#FF0015] bg-[#FF0015] bg-opacity-15" : 'text-white'}`} to={item.link}>
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
