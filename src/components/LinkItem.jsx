import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const LinkItem = ({ item }) => {
  return (
    <li>
      {item.link ? (
        <Link to={item.link}>
          <span>{item.text}</span>
        </Link>
      ) : (
        <span>{item.text}</span>
      )}
    </li>
  );
};

LinkItem.propTypes = {
  item: PropTypes.shape({
    link: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
};

export default LinkItem;
