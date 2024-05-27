import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import TextEditor from '../components/TextEditor'

const Edit = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [convertedContent, setConvertedContent] = useState('');

    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(DOMPurify.sanitize(html));
    }, [editorState]);

    return (
        <div className=' max-w-7xl  mx-auto'>
            <TextEditor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                convertedContent={convertedContent}
            />
        </div>
    )
}

export default Edit
