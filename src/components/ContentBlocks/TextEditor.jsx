import React from 'react'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';


const TextEditor = ({ editorState, onEditorStateChange, convertedContent }) => {

    function createMarkup(html) {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }


    return (
        <div className=' mt-10'>
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                wrapperClassName="p-4 border border-gray-300"
                editorClassName="bg-gray-200 p-4 border border-gray-300"
                toolbarClassName="border border-gray-300"
            />
            <div
                className=" p-4 mt-4 text-black"
                dangerouslySetInnerHTML={createMarkup(convertedContent)}>
            </div>
        </div>
    );
}

TextEditor.propTypes = {
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired,
    convertedContent: PropTypes.string.isRequired
};

export default TextEditor
