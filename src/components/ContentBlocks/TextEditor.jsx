import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';

const fontFamilyStyleMap = {
    'FONTFAMILY_Arial': { fontFamily: 'Arial' },
    'FONTFAMILY_Georgia': { fontFamily: 'Georgia' },
    'FONTFAMILY_Impact': { fontFamily: 'Impact' },
    'FONTFAMILY_Tahoma': { fontFamily: 'Tahoma' },
    'FONTFAMILY_Times New Roman': { fontFamily: 'Times New Roman' },
    'FONTFAMILY_Verdana': { fontFamily: 'Verdana' },
};

const fontSizeStyleMap = {
    'FONTSIZE_8': { fontSize: '8px' },
    'FONTSIZE_9': { fontSize: '9px' },
    'FONTSIZE_10': { fontSize: '10px' },
    'FONTSIZE_11': { fontSize: '11px' },
    'FONTSIZE_12': { fontSize: '12px' },
    'FONTSIZE_14': { fontSize: '14px' },
    'FONTSIZE_16': { fontSize: '16px' },
    'FONTSIZE_18': { fontSize: '18px' },
    'FONTSIZE_24': { fontSize: '24px' },
    'FONTSIZE_30': { fontSize: '30px' },
    'FONTSIZE_36': { fontSize: '36px' },
    'FONTSIZE_48': { fontSize: '48px' },
    'FONTSIZE_60': { fontSize: '60px' },
    'FONTSIZE_72': { fontSize: '72px' },
    'FONTSIZE_96': { fontSize: '96px' },
};

const customStyleMap = { ...fontFamilyStyleMap, ...fontSizeStyleMap };

const TextEditor = ({ editorState, onEditorStateChange }) => {
    return (
        <div className='w-4/5 mx-auto'>
            <Editor
                editorState={editorState}
                customStyleMap={customStyleMap}
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
                    },
                    colorPicker: {
                        colors: ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF']
                    },
                    fontFamily: {
                        options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                    },
                    fontSize: {
                        options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                    },
                }}
            />
        </div>
    );
}

TextEditor.propTypes = {
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired,
};

export default TextEditor;
