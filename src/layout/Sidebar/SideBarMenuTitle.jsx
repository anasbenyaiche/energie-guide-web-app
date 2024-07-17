import PropTypes from "prop-types";

const SideBarMenuTitle = ({ title, subtitle }) => {
  return (
    <div className=" mb-5">
      <h2 className=" text-white uppercase  font-medium  text-lg">{title}</h2>

      <span className="text-[#00a2d6]  ">{subtitle}</span>
    </div>
  );
};

SideBarMenuTitle.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default SideBarMenuTitle;
