import { useEffect, useState } from "react";
import ContentBlock from "./ContentBlock";
import PropTypes from "prop-types";
import { fetchContentBlocks } from "../services/contentBlockService";

const Page = ({ pageId }) => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getContentBlocks = async () => {
      try {
        setLoading(true);
        const blocksData = await fetchContentBlocks(pageId);
        setBlocks(blocksData);
      } catch (error) {
        console.error("Error fetching content blocks:", error);
      } finally {
        setLoading(false);
      }
    };

    getContentBlocks();
  }, [pageId]);

  if (loading) {
    return <div>Loading content...</div>; // Show loading indicator
  }

  return (
    <div>
      {blocks.map((block) => (
        <ContentBlock key={block.id} block={block} />
      ))}
    </div>
  );
};

Page.propTypes = {
  pageId: PropTypes.oneOfType([
    PropTypes.string.isRequired, // If pageId can be a string identifier
    PropTypes.number.isRequired, // If pageId is a numeric ID
  ]),
};

export default Page;
