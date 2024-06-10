import React, { useState, useEffect } from 'react';
import ReactFlow from 'reactflow';
import DownloadButton from './DownloadButton';
import './PreviewFlow.css';
const proOptions = { hideAttribution: true };
const PreviewFlow = ({ content }) => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    useEffect(() => {
        if (content) {
            setNodes(content.nodes || []);
            setEdges(content.edges || []);
        }
    }, [content]);

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodeDragStop={() => { }}
                snapToGrid={false}
                fitView
                proOptions={proOptions}
            >
                {/* <DownloadButton /> */}
            </ReactFlow>
        </div>
    );
};

export default PreviewFlow;
