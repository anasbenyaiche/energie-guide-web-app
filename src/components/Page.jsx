import { useEffect, useState } from "react";
import ContentBlock from "./ContentBlock";
import PropTypes from "prop-types";
import api from "../api/api";

const Page = ({ pageId }) => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const fetchContentBlocks = async () => {
      try {
        const response = await api.get(`/api/pages/${pageId}/blocks`);
        setBlocks(response.data);
      } catch (error) {
        console.error("Error fetching content blocks:", error);
      }
    };

    fetchContentBlocks();
  }, [pageId]);

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
