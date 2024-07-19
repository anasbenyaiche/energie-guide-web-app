import React, { useEffect, useState } from 'react'
import TextEditor from '../TextEditor'
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { stateFromHTML } from 'draft-js-import-html';
import PropTypes from 'prop-types';

const EditStep = ({ block, onClose, onSave }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [steps, setSteps] = useState([{ title: '', text: '' }]);

    useEffect(() => {
        if (block && block.content) {
            const content = JSON.parse(block.content);
            const contentState = stateFromHTML(content.text);
            setEditorState(EditorState.createWithContent(contentState));
            setSteps(content.steps || []);
        }
    }, [block]);

    const handleEditorStateChange = (state) => {
        setEditorState(state);
    };

    const handleChangeStep = (index, field, value) => {
        const updatedSteps = steps.map((step, i) =>
            i === index ? { ...step, [field]: value } : step
        );
        setSteps(updatedSteps);
    };

    const handleSave = () => {
        const html = convertToHTML(editorState.getCurrentContent());
        const updatedBlock = { ...block, content: JSON.stringify({ text: html, steps }) };
        onSave(updatedBlock);
    };

    return (
        <div>
            <TextEditor
                editorState={editorState}
                onEditorStateChange={handleEditorStateChange}
                convertedContent={convertToHTML(editorState.getCurrentContent())}
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
            <div className="flex justify-end mt-6">
                <button className="bg-red-500 text-white px-4 py-2 mr-2" onClick={onClose}>Cancel</button>
                <button className="bg-blue-500 text-white px-4 py-2" onClick={handleSave}>Save</button>
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
