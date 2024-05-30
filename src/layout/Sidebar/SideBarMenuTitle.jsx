import PropTypes from "prop-types";

const SideBarMenuTitle = ({ title, subtitle }) => {
  return (
    <div className="side-bar-menu-title-container">
      <h2 className="side-bar-menu-title ">{title}</h2>

      <span className="side-bar-menu-title-subtitle">{subtitle}</span>
    </div>
  );
};

SideBarMenuTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default SideBarMenuTitle;
