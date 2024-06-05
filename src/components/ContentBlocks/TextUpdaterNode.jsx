import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function TextUpdaterNode({ id, data, isConnectable }) {
    const handleChange = useCallback((evt) => {
        if (data.onChange) {
            data.onChange(id, evt.target.value);
        }
    }, [id, data]);

    const handleStyleChange = useCallback((evt) => {
        if (data.onStyleChange) {
            data.onStyleChange(id, { backgroundColor: evt.target.value });
        }
    }, [id, data]);

    return (
        <>
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} />

            <div className='px-2 py-6 rounded-md'>
                <input className=' w-[150px] bg-transparent  text-center' id="text" name="text" onChange={handleChange} value={data.label} />
                <input
                    type="color"
                    className=' cursor-pointer'
                    onChange={handleStyleChange}
                    value={data.style?.backgroundColor || '#FFFFFF'}
                />
            </div>
            <Handle type="target" position={Position.Left} id="a" isConnectable={isConnectable} />
            <Handle
                type="source"
                position={Position.Right}
                id="b"
                style={handleStyle}
            />
        </>
    );
}

export default TextUpdaterNode