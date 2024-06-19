import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { FaRegTrashAlt } from "react-icons/fa";


function TextUpdaterNode({ id, data, isConnectable }) {
    const handleChange = useCallback((evt) => {
        if (data.onChange) {
            data.onChange(id, evt.target.value);
        }
    }, [id, data]);

    const handleStyleChange = useCallback((evt) => {
        if (data.onStyleChange) {
            data.onStyleChange(id, { backgroundColor: evt.target.value, borderColor: evt.target.value });
        }
    }, [id, data]);
    const handleDelete = useCallback(() => {
        if (data.onDelete) {
            data.onDelete(id);
        }
    }, [id, data]);

    const toggleOpen = () => {
        data.setOpenToggleId(data.openToggleId === id ? null : id);
    };



    return (
        <>
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} />

            <div className='px-2 py-6 rounded-md flex relative'>
                <input className=' w-[150px] bg-transparent  text-center' id="text" name="text" onChange={handleChange} value={data.label} />
                {data.openToggleId === id && (
                    <div className='absolute -top-12 right-0 '>
                        <div className=' flex  gap-3 '>
                            <div className=' px-2 py-1  bg-white border border-gray-300 rounded-md'>
                                <input
                                    type="color"
                                    className=' cursor-pointer'
                                    onChange={handleStyleChange}
                                    value={data.style?.backgroundColor || '#F0F0F0'}
                                />
                            </div>
                            <div className=' bg-white border border-gray-300 rounded-md'>
                                <button className=' text-black p-2 hover:border-transparent hover:rounded-none bg-transparent' onClick={handleDelete}><FaRegTrashAlt /></button>
                            </div>
                        </div>
                    </div>
                )}
                <PiDotsThreeOutlineVerticalFill onClick={toggleOpen} />
            </div>
            <Handle type="target" position={Position.Left} id="a" isConnectable={isConnectable} />

        </>
    );
}

export default TextUpdaterNode