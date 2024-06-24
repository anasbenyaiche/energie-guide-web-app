import React from 'react'
import { Handle, Position } from 'reactflow';
const CustomNode = ({ id, data, isConnectable }) => {
    const handleNodeClick = () => {
        if (data.onClick) {
            data.onClick(id);
        }
    }
    return (
        <>
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
            <div onClick={handleNodeClick} className=' w-[150px] custom-node px-2 py-5 rounded-md flex text-xs'>
                <div className='w-full text-center break-words'> {data.label} </div>
            </div>
            <Handle type="target" position={Position.Left} id="a" isConnectable={isConnectable} />
        </>
    )
}

export default CustomNode
