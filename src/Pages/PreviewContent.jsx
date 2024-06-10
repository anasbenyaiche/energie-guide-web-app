import React, { useEffect, useRef, useState } from "react";
import ListContent from "../components/ContentBlocks/ListContent";
import EditTextEditor from "../components/ContentBlocks/EditTextEditor";
import Modal from "../components/Modal/Modal";
import EditTable from "../components/ContentBlocks/EditTable";
import { useParams } from "react-router-dom";

import { getPageContent } from "../services/pageService";
import {
  deleteContentBlock,
  updateContentBlock,
} from "../services/contentBlocksService";

const PreviewContent = () => {
  const [content, setContent] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { pageId } = useParams();

  useEffect(() => {
    const displayContent = async () => {
      try {
        const blocks = await getPageContent(pageId);
        setContent(blocks);
        recalculatePositions(blocks);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };
    displayContent();
  }, [pageId]);

  const handleDelete = async (id) => {
    try {
      await deleteContentBlock(id);
      setContent(content.filter((block) => block._id !== id));
    } catch (error) {
      console.error("Error deleting block:", error);
    }
  };

  const handleEdit = (block) => {
    setSelectedBlock(block);
    setOpenModal(true);
  };

  const handleSave = async (updatedBlock) => {
    try {
      await updateContentBlock(updatedBlock);
      setContent(
        content.map((block) =>
          block._id === updatedBlock._id ? updatedBlock : block
        )
      );
      setOpenModal(false);
    } catch (error) {
      console.error("Error updating block:", error);
    }
  };

  const dragBlock = useRef(0);
  const dragOverBlock = useRef(0);

  const handleSort = () => {
    const blockClone = [...content];
    const temp = blockClone[dragBlock.current];
    blockClone[dragBlock.current] = blockClone[dragOverBlock.current];
    blockClone[dragOverBlock.current] = temp;
    recalculatePositions(blockClone);
  };

  const recalculatePositions = (blocks) => {
    blocks.forEach((block, index) => {
      block.position = index;
    });
    setContent([...blocks]);
    localStorage.setItem("position", blocks.length - 1);
  };

  return (
    <div className="max-w-7xl my-8 mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Preview Content</h1>
      </div>
      <div className="bg-white shadow-md p-4 mt-5 rounded-md">
        {content.length > 0 ? (
          content.map((item, index) => (
            <ListContent
              key={item._id}
              blocks={item}
              onDelete={handleDelete}
              onEdit={() => handleEdit(item)}
              draggable
              onDragStart={() => (dragBlock.current = index)}
              onDragEnter={() => (dragOverBlock.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
            />
          ))
        ) : (
          <h2>No content at the moment</h2>
        )}
      </div>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        {selectedBlock?.type === "text" && (
          <EditTextEditor
            block={selectedBlock}
            onClose={() => setOpenModal(false)}
            onSave={handleSave}
          />
        )}
        {selectedBlock?.type === "table" && (
          <EditTable
            block={selectedBlock}
            onClose={() => setOpenModal(false)}
            onSave={handleSave}
          />
        )}
      </Modal>
    </div>
  );
};

export default PreviewContent;
