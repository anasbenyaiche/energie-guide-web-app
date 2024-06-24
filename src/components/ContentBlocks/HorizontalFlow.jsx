import React, { useState, useCallback } from 'react';
import ReactFlow, { useNodesState, Background, Controls, useEdgesState, addEdge, useReactFlow, Panel, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import initialEdges from '../../utils/DiagramFlow/initialEdges';
import initialNodes from '../../utils/DiagramFlow/initialNodes';
import TextUpdaterNode from './TextUpdaterNode';
import { SketchPicker } from 'react-color';
import TextEditor from './TextEditor';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
const flowKey = 'Digramme-Guide';

const getNodeId = () => `node_${+new Date()}`;

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
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [convertedContent, setConvertedContent] = useState('');
  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), [setEdges]);
  const { setViewport } = useReactFlow();
  const { id } = useParams()

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    setConvertedContent(convertToHTML(newEditorState.getCurrentContent()));
  };
  const handleColorChange = (color) => {
    setNodeBg({ backg: color.hex });
    setColorInputValue(color.hex);
  };
  const handelTextColor = (color) => {
    setNodeColor({ color: color.hex })
    setTextInputValue(color.hex)
  }
  const handleColorClick = () => {
    setOpenColor(!openColor)
    if (openTextColor) {
      setOpenTextColor(false)
    }
  }
  const handleTextColor = () => {
    setOpenTextColor(!openTextColor)
    if (openColor) {
      setOpenColor(false)
    }
  }
  const handleNodeChange = useCallback((id, data) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
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
      data: {
        label: `${state.name}`,
        text: convertedContent,
      },
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
    setNodes((nds) => nds.concat(newNode));
  }, [nodes, setNodes, state.name, nodeBg.backg, nodeColor.color, convertedContent]);

  const deleteNodeById = useCallback((id) => {
    setNodes(nds => nds.filter(node => node.id !== id));
  }, [setNodes]);
  return (
    <div className='w-full'>
      <div >
        <div className='flex items-baseline  justify-start gap-4'>
          <div class="relative z-0">
            <label className='text-[#00a2d6] text-sm' htmlFor="">Add Title</label>
            <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-[#00a2d6] focus:outline-none focus:ring-0 focus:border-[#00a2d6] peer"
              placeholder=" "
              onChange={(e) => {
                setState((prev) => ({ ...prev, name: e.target.value }));
              }} />
          </div>
          <div class="relative z-0">
            <label className='text-[#00a2d6] text-sm' htmlFor=""> Add Background </label>
            <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-[#00a2d6] focus:outline-none focus:ring-0 focus:border-[#00a2d6] peer"
              value={colorInputValue}
              readOnly
              onClick={handleColorClick} />
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
            <label className='text-[#00a2d6] text-sm' htmlFor="">Add Color</label>
            <input type="text" id="floating_standard" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-[#00a2d6] focus:outline-none focus:ring-0 focus:border-[#00a2d6] peer"
              value={TextInputValue}
              readOnly
              onClick={handleTextColor} />
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
        <div className='mt-5  w-3/5'>
          <div className='mb-4'>
            <label className='text-[#00a2d6] text-sm' htmlFor=""> Add Text </label>
          </div>
          <TextEditor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            convertedContent={convertedContent}
          />
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