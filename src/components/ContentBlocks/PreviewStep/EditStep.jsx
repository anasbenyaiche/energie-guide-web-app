import React, { useEffect, useState } from 'react'
import TextEditor from '../TextEditor'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import { HiMiniXMark } from "react-icons/hi2";
const EditStep = ({ block, onClose, onSave }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [convertedContent, setConvertedContent] = useState('');
    const [steps, setSteps] = useState([{ title: '', text: '' }]);

    useEffect(() => {
        if (block && block.content) {
            try {
                const parsedContent = JSON.parse(block.content);

                if (parsedContent.text) {
                    const contentState = convertFromRaw(parsedContent.text);
                    setEditorState(EditorState.createWithContent(contentState));
                }

                if (parsedContent.steps) {
                    setSteps(parsedContent.steps);
                }
            } catch (error) {
                console.error("Error loading content:", error.message);
            }
        }
    }, [block.content]);

    const handleEditorStateChange = (state) => {
        setEditorState(state);
        const html = convertToHTML(state.getCurrentContent());
        setConvertedContent(html);
    };

    const handleChangeStep = (index, field, value) => {
        const updatedSteps = steps.map((step, i) =>
            i === index ? { ...step, [field]: value } : step
        );
        setSteps(updatedSteps);
    };

    const handleSave = () => {
        const contentState = editorState.getCurrentContent();
        const rawContent = convertToRaw(contentState);
        const updatedBlock = { ...block, content: JSON.stringify({ text: rawContent, steps }) };
        onSave(updatedBlock);
    };

    return (
        <div>
            <TextEditor
                editorState={editorState}
                onEditorStateChange={handleEditorStateChange}
                convertedContent={convertedContent}
            />
            <div className="mt-4 grid grid-cols-2">
                {steps.map((step, index) => (
                    <div key={index} className="relative stepsection">
                        <div className="arrow mb-4 mx-auto ">
                            <div className=' w-4/5 mx-auto p-1' >
                                <input
                                    type="text"
                                    className="w-full text-sm p-2 font-bold mb-2 text-white placeholder-gray-300 bg-transparent border-0 border-b border-white appearance-none focus:outline-none focus:ring-0"
                                    placeholder="Step Title"
                                    value={step.title}
                                    onChange={(e) => handleChangeStep(index, 'title', e.target.value)}
                                />
                                <textarea
                                    className="w-full p-2 mb-2 text-xs overflow-hidden placeholder-gray-300 text-white bg-transparent border-0 border-b border-white appearance-none focus:outline-none focus:ring-0"
                                    placeholder="Step Text"
                                    value={step.text}
                                    onChange={(e) => handleChangeStep(index, 'text', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-end mt-6 gap-5">
                <button onClick={onClose} className="bg-red-500 flex gap-2 justify-between items-center text-white px-3 py-3 ml-2">
                    <HiMiniXMark className='text-2xl' /> Annuler</button>
                <button onClick={handleSave} className=" flex items-center justify-between gap-2 bg-bg-btn px-3 py-3 text-white">
                    <FaPlus className="mr-2" />Enregistrer</button>
            </div>
        </div>
    )
}
EditStep.propTypes = {
    block: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default EditStep
