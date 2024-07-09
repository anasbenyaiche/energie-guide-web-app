import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow from 'reactflow';
import DownloadButton from './DownloadButton';
import CustomNode from './CustomNode';
import CustomNodeText from './CustomNodeText';

const proOptions = { hideAttribution: true };
const nodeTypes = {
    customtext: CustomNodeText,
    customnode: CustomNode
};
const PreviewFlow = ({ content }) => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [clickedNodeId, setClickedNodeId] = useState(null);

    useEffect(() => {
        if (content) {
            const transformedNodes = content.nodes.map(node => {
                if (node.data && node.data.label) {
                    return { ...node, type: 'customnode', data: { ...node.data, onClick: handleNodeClick } };
                }
                if (node.data && node.data.text) {
                    return { ...node, type: 'customtext' };
                }
                return node;
            });

            setNodes(transformedNodes);
            setEdges(content.edges || []);
        }
    }, [content]);
    const handleNodeClick = (nodeId) => {
        setClickedNodeId(nodeId === clickedNodeId ? null : nodeId);
    };


    return (
        <div className='previewflow  relative' style={{ width: '100%', height: '70vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodeDragStop={() => { }}
                snapToGrid={false}
                nodeTypes={nodeTypes}
                fitView
                proOptions={proOptions}
                nodesDraggable={false}
                preventScrolling={false}
                panOnDrag={false}
                zoomOnDoubleClick={false}
                zoomOnPinch={false}
            />
            {clickedNodeId && (
                <div className='menu'>
                    {nodes
                        .filter(node => node.id === clickedNodeId)
                        .map(node => (
                            <CustomNodeText key={node.id} data={node.data} />
                        ))}
                </div>
            )}
        </div>
    );
};

export default PreviewFlow;
