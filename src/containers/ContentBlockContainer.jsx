import ContentBlock from "../components/ContentBlock";
import PropTypes from "prop-types";
import Layout from "../layout/layout";
import Footer from "../layout/Footer/Footer";
import { useMatch } from "react-router-dom";

export const ContentBlockContainer = ({ contentBlocks, title }) => {
  console.log("title", title);
  return (
    <div>
      <h1>{title}</h1>

      {contentBlocks?.map((block) => (
        <ContentBlock key={block._id} block={block} />
      ))}
    </div>
  );
};
ContentBlockContainer.propTypes = {
  contentBlocks: PropTypes.array.isRequired,
  title: PropTypes.string,
};
