import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
const SideBarMenuItem = ({ item, editPage }) => {
  const location = useLocation();
  const isActive = location.pathname === item.link;
  return (
    <li className={`text-sm font-medium mb-3 hover:bg-[#FF0015] hover:text-[#FF0015] hover:bg-opacity-15 flex justify-between items-center ${isActive ? "text-[#FF0015] hover:bg-[#FF0015] hover:bg-opacity-15 bg-[#FF0015] bg-opacity-15" : 'text-white'}`}>
      <Link className={`arrow-text flex items-center  w-full p-2  rounded-sm`} to={item.link}>
        {item.title}
      </Link>
      <button onClick={editPage}> <FaRegEdit className=" text-white text-md" /> </button>
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
