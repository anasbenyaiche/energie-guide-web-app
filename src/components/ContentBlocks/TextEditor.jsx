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
        <div className=' w-4/5 mx-auto'>
            <Editor
                editorState={editorState}
                placeholder='Your text here.....'
                onEditorStateChange={onEditorStateChange}
                wrapperClassName="p-4 border border-gray-300"
                editorClassName="bg-gray-200 p-4 border border-gray-300"
                toolbarClassName="border border-gray-300"
                toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    blockType: {
                        inDropdown: true,
                        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                    },
                    colorPicker: {
                        className: undefined,
                        component: undefined,
                        popupClassName: undefined,
                        colors: ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF']
                    },
                    fontFamily: {
                        options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana', 'Hamza'],
                    },
                    fontSize: {
                        options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                    },
                }}
            />
            {/* <div
                className=" p-4 mt-4 text-black"
                dangerouslySetInnerHTML={createMarkup(convertedContent)}>
            </div> */}
        </div>
    );
}

TextEditor.propTypes = {
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired,
    convertedContent: PropTypes.string.isRequired
};

export default TextEditor
