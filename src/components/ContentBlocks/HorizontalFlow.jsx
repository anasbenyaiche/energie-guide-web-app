import React, { useState, useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, useReactFlow, Panel, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import initialEdges from '../../utils/DiagramFlow/initialEdges';
import initialNodes from '../../utils/DiagramFlow/initialNodes';
import TextUpdaterNode from './TextUpdaterNode';


const flowKey = 'Digramme-Guide';

const getNodeId = () => `randomnode_${+new Date()}`;

const nodeTypes = { textUpdater: TextUpdaterNode };

const HorizontalFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [state, setState] = useState({ name: "Empty Nodes" });
  const [nodeBg, setNodeBg] = useState({ backg: '#eee' });
  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), [setEdges]);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();
  const { id } = useParams()


  const handleNodeChange = useCallback((id, newLabel) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label: newLabel } } : node
      )
    );
  }, [setNodes]);

  const handleStyleChange = useCallback((id, newStyle) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, style: { ...node.style, ...newStyle } } : node
      )
    );
  }, [setNodes]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: `${state.name}` },
      style: { backgroundColor: `${nodeBg.backg}` },
      sourcePosition: "right",
      targetPosition: "left",
      type: 'straight',
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [nodes, setNodes, state.name, nodeBg.backg]);

  const onSave = useCallback(async () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      const token = localStorage.getItem('token');
      const contentblock = {
        type: 'charts',
        content: flow,
        position: 50
      };
      try {
        const endPoint =
          process.env.NODE_ENV === "development"
            ? "http://localhost:5000/api/"
            : "https://energie-guide-web-app.vercel.app/api";

        const response = await axios.post(`${endPoint}pages/${id}/blocks`, contentblock, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("Data saved successfully:", response.data);
      } catch (error) {
        console.error('Error saving data:', error);
      }
      console.log("react flow", flow)
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  return (
    <div className='w-full'>
      <div style={{ width: '100vw', height: '100vh' }}>
        <div>
          <input
            type="text"
            className=' bg-white border border-black text-black'
            onChange={(e) => {
              setState((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
          <input
            type='color'
            className=' bg-white border border-black text-black'
            onChange={(e) => {
              setNodeBg({ backg: e.target.value });
            }}
          />
        </div>
        <ReactFlow
          nodes={nodes.map(node => {
            if (node.type === 'textUpdater') {
              return {
                ...node,
                data: {
                  ...node.data,
                  onChange: handleNodeChange,
                  onStyleChange: handleStyleChange
                }
              }
            }
            return node;
          })}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
          onInit={setRfInstance}
        >
          <Panel position="top-center">
            <button onClick={onSave}>save</button>
            <button onClick={onRestore}>restore</button>
            <button onClick={onAdd}>add node</button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <HorizontalFlow />
  </ReactFlowProvider>
);