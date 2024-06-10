import React, { useState, useCallback } from 'react';
import ReactFlow, { useNodesState, Background, Controls, useEdgesState, addEdge, useReactFlow, Panel, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import initialEdges from '../../utils/DiagramFlow/initialEdges';
import initialNodes from '../../utils/DiagramFlow/initialNodes';
import TextUpdaterNode from './TextUpdaterNode';
import { SketchPicker } from 'react-color';

const flowKey = 'Digramme-Guide';

const getNodeId = () => `randomnode_${+new Date()}`;

const nodeTypes = { textUpdater: TextUpdaterNode };
const proOptions = { hideAttribution: true };
const HorizontalFlow = ({ setRfInstance }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [state, setState] = useState({ name: "Empty Nodes" });
  const [nodeBg, setNodeBg] = useState({ backg: '#eee' });
  const [nodeColor, setNodeColor] = useState({ color: "#fff" })
  const [openColor, setOpenColor] = useState(false)
  const [openTextColor, setOpenTextColor] = useState(false)
  const [colorInputValue, setColorInputValue] = useState(nodeBg.backg);
  const [TextInputValue, setTextInputValue] = useState(nodeColor.color);
  const [openToggleId, setOpenToggleId] = useState(null);
  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), [setEdges]);
  const { setViewport } = useReactFlow();
  const { id } = useParams()

  const handleColorChange = (color) => {
    setNodeBg({ backg: color.hex });
    setColorInputValue(color.hex);
  };
  const handelTextColor = (color) => {
    setNodeColor({ color: color.hex })
    setTextInputValue(color.hex)
  }
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
    const newNodeId = getNodeId();
    const newNode = {
      id: newNodeId,
      data: { label: `${state.name}` },
      style: {
        backgroundColor: `${nodeBg.backg}`,
        color: `${nodeColor.color}`,
        borderColor: `${nodeBg.backg}`,
        borderRadius: "5px"
      },
      sourcePosition: "right",
      targetPosition: "left",
      type: 'textUpdater',
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
      width: 150
    };
    const newEdge = {
      type: 'step',
    };
    setNodes((nds) => nds.concat(newNode));
    setEdges((eds) => eds.concat(newEdge));
  }, [nodes, setNodes, setEdges, state.name, nodeBg.backg, nodeColor.color]);

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
  const deleteNodeById = useCallback((id) => {
    setNodes(nds => nds.filter(node => node.id !== id));
  }, [setNodes]);
  return (
    <div className='w-full'>
      <div >
        <div className='flex items-baseline  justify-start gap-4'>
          <div class="relative z-0">
            <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-[#00a2d6] focus:outline-none focus:ring-0 focus:border-[#00a2d6] peer"
              placeholder=" "
              onChange={(e) => {
                setState((prev) => ({ ...prev, name: e.target.value }));
              }} />
            <label htmlFor="floating_standard" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#00a2d6] peer-focus:dark:text-[#00a2d6] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Add Text</label>
          </div>
          <div class="relative z-0">
            <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-[#00a2d6] focus:outline-none focus:ring-0 focus:border-[#00a2d6] peer"
              value={colorInputValue}
              readOnly
              onClick={() => setOpenColor(!openColor)} />
            {openColor && (
              <div className='relative'>
                <SketchPicker
                  color={nodeBg.backg}
                  onChangeComplete={handleColorChange}
                  className=' absolute bottom-10'
                />
              </div>
            )}
          </div>
          <div class="relative z-0">
            <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-[#00a2d6] focus:outline-none focus:ring-0 focus:border-[#00a2d6] peer"
              value={TextInputValue}
              readOnly
              onClick={() => setOpenTextColor(!openTextColor)} />
            {openTextColor && (
              <div className='relative'>
                <SketchPicker
                  color={nodeColor.color}
                  onChangeComplete={handelTextColor}
                  className=' absolute bottom-10'
                />
              </div>
            )}
          </div>
        </div>
        <div className='text-end px-6 '>
          <button className='bg-[#00a2d6] text-end border rounded-md mt-4
           border-[#00a2d6] focus:outline-none
            text-white px-5 py-2 hover:border-[#00a2d6]' onClick={onAdd}>Add node</button>
        </div>
        <div style={{ width: '100%', height: 'calc(100vh - 50px)' }}>
          <ReactFlow
            nodes={nodes.map(node => {
              if (node.type === 'textUpdater') {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    onChange: handleNodeChange,
                    onStyleChange: handleStyleChange,
                    onDelete: deleteNodeById,
                    openToggleId,
                    setOpenToggleId
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
            proOptions={proOptions}
          >
            <Background />
            <Controls className="react-flow_controls" showInteractive={false} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

HorizontalFlow.propTypes = {
  setRfInstance: PropTypes.func.isRequired,
};


const HorizontalFlowWrapper = (props) => (
  <ReactFlowProvider>
    <HorizontalFlow {...props} />
  </ReactFlowProvider>
);
export default HorizontalFlowWrapper;