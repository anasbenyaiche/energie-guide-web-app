import React, { useState, useRef } from 'react';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';

const colorStyleMap = {
    red: { color: 'rgba(255, 0, 0, 1.0)' },
    orange: { color: 'rgba(255, 127, 0, 1.0)' },
    yellow: { color: 'rgba(180, 180, 0, 1.0)' },
    green: { color: 'rgba(0, 180, 0, 1.0)' },
    blue: { color: 'rgba(0, 0, 255, 1.0)' },
    indigo: { color: 'rgba(75, 0, 130, 1.0)' },
    violet: { color: 'rgba(127, 0, 255, 1.0)' },
};

const styles = {
    root: { fontFamily: '\'Georgia\', serif', fontSize: 14, padding: 20, width: '100%' },
    editor: { borderTop: '1px solid #ddd', cursor: 'text', fontSize: 16, marginTop: 20, minHeight: 400, paddingTop: 20 },
    controls: { fontFamily: '\'Helvetica\', sans-serif', fontSize: 14, marginBottom: 10, userSelect: 'none' },
    styleButton: { color: '#999', cursor: 'pointer', marginRight: 16, padding: '2px 0' },
};

const DraftEditor = ({ editorState, onEditorStateChange }) => {
    const editor = useRef(null);

    const focusEditor = () => {
        if (editor.current) {
            editor.current.focus();
        }
    };

    const toggleColor = (toggledColor) => {
        const selection = editorState.getSelection();
        const nextContentState = Object.keys(colorStyleMap).reduce((contentState, color) => {
            return Modifier.removeInlineStyle(contentState, selection, color);
        }, editorState.getCurrentContent());

        let nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style');
        const currentStyle = editorState.getCurrentInlineStyle();

        if (selection.isCollapsed()) {
            nextEditorState = currentStyle.reduce((state, color) => {
                return RichUtils.toggleInlineStyle(state, color);
            }, nextEditorState);
        }

        if (!currentStyle.has(toggledColor)) {
            nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, toggledColor);
        }

        onEditorStateChange(nextEditorState);
    };

    return (
        <div style={styles.root}>
            <ColorControls editorState={editorState} onToggle={toggleColor} />
            <div style={styles.editor} onClick={focusEditor}>
                <Editor
                    customStyleMap={colorStyleMap}
                    editorState={editorState}
                    onChange={onEditorStateChange}
                    placeholder="Write something colorful..."
                    ref={editor}
                />
            </div>
        </div>
    );
};

DraftEditor.propTypes = {
    editorState: PropTypes.object.isRequired,
    onEditorStateChange: PropTypes.func.isRequired,
};

const ColorControls = ({ editorState, onToggle }) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    return (
        <div style={styles.controls}>
            {COLORS.map((type) => (
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={onToggle}
                    style={type.style}
                />
            ))}
        </div>
    );
};

ColorControls.propTypes = {
    editorState: PropTypes.object.isRequired,
    onToggle: PropTypes.func.isRequired,
};

const StyleButton = ({ active, label, onToggle, style }) => {
    const handleMouseDown = (e) => {
        e.preventDefault();
        onToggle(style);
    };

    let buttonStyle = styles.styleButton;
    if (active) {
        buttonStyle = { ...buttonStyle, ...colorStyleMap[style] };
    }

    return (
        <span style={buttonStyle} onMouseDown={handleMouseDown}>
            {label}
        </span>
    );
};

StyleButton.propTypes = {
    active: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onToggle: PropTypes.func.isRequired,
    style: PropTypes.string.isRequired,
};

const COLORS = [
    { label: 'Red', style: 'red' },
    { label: 'Orange', style: 'orange' },
    { label: 'Yellow', style: 'yellow' },
    { label: 'Green', style: 'green' },
    { label: 'Blue', style: 'blue' },
    { label: 'Indigo', style: 'indigo' },
    { label: 'Violet', style: 'violet' },
];

export default DraftEditor;