import React from 'react';
import { getSmoothStepPath } from 'reactflow';

const CustomEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}) => {
    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition: 'right', // Ensuring source is right
        targetX,
        targetY,
        targetPosition: 'left', // Ensuring target is left
    });

    return (
        <g className="react-flow__edge">
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
        </g>
    );
};

export default CustomEdge;
