import PropTypes from "prop-types";

const ImageBlock = ({ content }) => {
  return <img src={content.src} alt={content.alt} style={content.style} />;
};
ImageBlock.propTypes = {
  content: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    style: PropTypes.object,
  }).isRequired,
};

export default ImageBlock;
