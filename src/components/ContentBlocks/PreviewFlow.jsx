import React, { useState, useEffect } from 'react';
import ReactFlow from 'reactflow';
import DownloadButton from './DownloadButton';


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
                onElementsRemove={false}
                onConnect={() => { }}
                snapToGrid={false}
            >
                {/* <DownloadButton /> */}
            </ReactFlow>
        </div>
    );
};

export default PreviewFlow;
