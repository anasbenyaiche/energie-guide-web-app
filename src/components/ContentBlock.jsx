import TextBlock from "./TextBlock";
import ImageBlock from "./ImageBlock";
import ChartBlock from "./ChartBlock";
import PropTypes from "prop-types";

const ContentBlock = ({ block }) => {
  switch (block.type) {
    case "text":
      return <TextBlock content={block.content} />;
    case "image":
      return <ImageBlock content={block.content} />;
    case "chart":
      return <ChartBlock content={block.content} />;
    default:
      return null;
  }
};
ContentBlock.propTypes = {
  block: PropTypes.shape({
    type: PropTypes.oneOf(["text", "image", "chart"]).isRequired,
    content: PropTypes.oneOfType([
      PropTypes.shape(TextBlock.propTypes.content), // TextBlock content structure
      PropTypes.shape(ImageBlock.propTypes.content), // ImageBlock content structure
      PropTypes.shape(ChartBlock.propTypes.content), // ChartBlock content structure
    ]).isRequired,
  }).isRequired,
};

export default ContentBlock;
