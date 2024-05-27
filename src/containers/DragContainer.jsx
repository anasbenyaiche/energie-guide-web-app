import { useState } from "react";
import DragAndDrop from "../components/DragAndDrop";
const contentBlocksFake = [
  {
    id: 1,
    content: (
      <div>
        <h2>Heading for Content Block 1</h2>
        <p>
          This is the content of Content Block 1. You can add any type of
          content here, like text, images, or even embedded media.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <img
        src="https://picsum.photos/id/237/200/300" // Replace with a placeholder image URL
        alt="Placeholder Image"
      />
    ),
  },
  {
    id: 3,
    content: (
      <div>
        <h3>Content Block 3 - List</h3>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    ),
  },
  // Add more content blocks with different content types as needed
];

const ContentBlockContainer = () => {
  const [contentBlocks, setContentBlocks] = useState(contentBlocksFake);

  const moveContentBlock = (dragIndex, hoverIndex) => {
    const draggedBlock = contentBlocks[dragIndex];
    const updatedBlocks = [...contentBlocks];
    updatedBlocks.splice(dragIndex, 1);
    updatedBlocks.splice(hoverIndex, 0, draggedBlock);
    setContentBlocks(updatedBlocks);
  };

  return (
    <div>
      {contentBlocks.map((block, index) => (
        <DragAndDrop
          key={block.id}
          id={block.id}
          index={index}
          content={block.content}
          moveContentBlock={moveContentBlock}
        />
      ))}
    </div>
  );
};

export default ContentBlockContainer;
