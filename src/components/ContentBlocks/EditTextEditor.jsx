import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { stateFromHTML } from 'draft-js-import-html';
import TextEditor from './TextEditor';

const EditTextEditor = ({ block, onClose, onSave }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [convertedContent, setConvertedContent] = useState('');

    useEffect(() => {
        if (block && block.content) {
            const contentState = stateFromHTML(block.content);
            setEditorState(EditorState.createWithContent(contentState));
        }
    }, [block]);

    const handleEditorStateChange = (state) => {
        setEditorState(state);
        const html = convertToHTML(state.getCurrentContent());
        setConvertedContent(html);
    };

    const handleSave = () => {
        const html = convertToHTML(editorState.getCurrentContent());
        const updatedBlock = { ...block, content: html };
        onSave(updatedBlock);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2 className=' text-black'>Edit Content Block</h2>
                <TextEditor
                    editorState={editorState}
                    onEditorStateChange={handleEditorStateChange}
                    convertedContent={convertedContent}
                />
                <button className='bg-white px-4 py-1  text-black' onClick={onClose}>close</button>
                <button className='bg-white px-4 py-1  text-black' onClick={handleSave}>Save</button>
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
