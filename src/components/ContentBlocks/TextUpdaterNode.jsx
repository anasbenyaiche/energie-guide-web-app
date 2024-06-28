import { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { FaRegTrashAlt } from "react-icons/fa";
import TextEditor from './TextEditor';
import { convertToHTML } from 'draft-convert';
import { IoTextSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { TiArrowBackOutline } from "react-icons/ti";

function TextUpdaterNode({ id, data, isConnectable }) {
    const [openNode, setOpenNode] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const [editorState, setEditorState] = useState(data.editorState);
    const [convertedContent, setConvertedContent] = useState(data.text);


    const handleChange = useCallback((evt) => {
        if (data.onChange) {
            data.onChange(id, { ...data, label: evt.target.value });
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

    const handleEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
        setConvertedContent(convertToHTML(newEditorState.getCurrentContent()));
    };
    const saveChanges = () => {
        setIsEditing(false);
        if (data.onChange) {
            data.onChange(id, { ...data, text: convertedContent, editorState });
        }
    };


    return (
        <>
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
            <div className='px-2 py-6 rounded-md flex relative'>
                <input className=' w-[150px] bg-transparent  text-center' id="text" name="text" onChange={handleChange} value={data.label} />
                <div>
                    {openNode && (
                        <div className={`${openNode ? '' : ''}`}>
                            <div className=" absolute right-0 left-0 w-[600px] space-y-4 bg-white shadow-md p-6 px-6 py-8">
                                {isEditing ? (
                                    <div>
                                        <div className=' text-left'>
                                            <button className=' bg-transparent border-none mb-4 text-2xl p-0 focus:outline-none'
                                                onClick={() => setIsEditing(false)} ><TiArrowBackOutline /></button>
                                        </div>
                                        <TextEditor
                                            editorState={editorState}
                                            onEditorStateChange={handleEditorStateChange}
                                            convertedContent={convertedContent}
                                        />
                                        <button
                                            className='bg-[#00a2d6] text-end border rounded-md mt-4
                                            border-[#00a2d6] focus:outline-none
                                                text-white px-5 py-2 hover:border-[#00a2d6]'
                                            onClick={saveChanges}>Save</button>
                                    </div>
                                ) : (
                                    <div>
                                        <div className=' text-right'>
                                            <button
                                                className='text-black bg-transparent border-none text-2xl p-0 focus:outline-none'
                                                onClick={() => setIsEditing(true)}><CiEdit /> </button>
                                        </div>
                                        <div className='mt-2 text-center text-black' >
                                            <div dangerouslySetInnerHTML={{ __html: data.text }} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>

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
                            <div className=' bg-white border border-gray-300 rounded-md'>
                                <button className=' text-black p-2 hover:border-transparent hover:rounded-none bg-transparent focus:outline-none' onClick={() => setOpenNode(!openNode)}> <IoTextSharp /></button>
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