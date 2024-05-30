import LinkItem from "../../components/LinkItem";
import "./LinkList.css";
import PropTypes from "prop-types";

const LinkList = ({ data, title }) => {
  return (
    <div className="main-page-links-list flex min-h-screen w-full">
      <ul>
        <h1 className="main-page-links-item-list">{title}</h1>
        {data?.map((item, index) => (
          <LinkItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );
};

LinkList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
};

export default LinkList;
