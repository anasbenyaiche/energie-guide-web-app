import PropTypes from "prop-types";

const TextBlock = ({ content }) => {
  return <div style={content.style}>{content.text}</div>;
};

TextBlock.propTypes = {
  content: PropTypes.shape({
    style: PropTypes.object,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default TextBlock;
