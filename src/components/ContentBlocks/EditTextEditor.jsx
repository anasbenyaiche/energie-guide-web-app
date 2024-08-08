import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import TextEditor from './TextEditor';
import { FaPlus } from 'react-icons/fa';
import { HiMiniXMark } from "react-icons/hi2";

const EditTextEditor = ({ block, onClose, onSave }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [convertedContent, setConvertedContent] = useState('');

    useEffect(() => {
        if (block && block.content) {
            try {
                const rawContent = block.content;
                if (!rawContent.entityMap) {
                    rawContent.entityMap = {};
                }
                const contentState = convertFromRaw(rawContent);
                setEditorState(EditorState.createWithContent(contentState));
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

    const handleSave = () => {
        const contentState = editorState.getCurrentContent();
        const rawContent = convertToRaw(contentState);
        const updatedBlock = { ...block, content: rawContent };
        onSave(updatedBlock);
    };

    return (
        <div>
            <TextEditor
                editorState={editorState}
                onEditorStateChange={handleEditorStateChange}
                convertedContent={convertedContent}
            />
            <div className="flex justify-end mt-6 gap-5">
                <button onClick={onClose} className="bg-red-500 flex gap-2 justify-between items-center text-white px-3 py-3 ml-2">
                    <HiMiniXMark className='text-2xl' /> Annuler</button>
                <button onClick={handleSave} className=" flex items-center justify-between gap-2 bg-bg-btn px-3 py-3 text-white">
                    <FaPlus className="mr-2" />Enregistrer</button>
            </div>
        </div>
    );
};

EditTextEditor.propTypes = {
    block: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default EditTextEditor;
