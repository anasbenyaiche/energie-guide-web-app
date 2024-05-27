import React from "react";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { ItemTypes } from "../constants/ItemTypes";

const ContentBlock = ({ id, content, index, moveContentBlock }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.CONTENT_BLOCK,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      // Prevent reordering items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine hover area rectangle
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      // Calculate vertical middle of the hover area
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Get mouse position relative to the hover area
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse crosses half of the item height
      // with appropriate direction checks (downwards or upwards)
      const isCrossingHalf = Math.abs(dragIndex - hoverIndex) === 1;
      const shouldMoveUp =
        dragIndex < hoverIndex && hoverClientY < hoverMiddleY;
      const shouldMoveDown =
        dragIndex > hoverIndex && hoverClientY > hoverMiddleY;

      if (isCrossingHalf && (shouldMoveUp || shouldMoveDown)) {
        moveContentBlock(dragIndex, hoverIndex);
        // Note: We're directly mutating the monitor item here, which is
        // generally not ideal. Consider using a copy-based approach
        // for better immutability.
        item.index = hoverIndex;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CONTENT_BLOCK, id, index }, // Ensure `type` is defined
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1; // Adjust opacity for visual feedback

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity,
        padding: "10px",
        border: "1px solid #ddd",
        marginBottom: "10px",
      }}
    >
      {content}
    </div>
  );
};

ContentBlock.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  index: PropTypes.number.isRequired,
  moveContentBlock: PropTypes.func.isRequired,
};

export default ContentBlock;
