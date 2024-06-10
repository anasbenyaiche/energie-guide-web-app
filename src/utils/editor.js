import { convertToHTML } from 'draft-convert';

const customBlockToHTML = (block) => {
    const { textAlign } = block.data || {};
    let alignment = textAlign ? ` style="text-align:${textAlign};"` : '';
    return {
        start: `<p${alignment}>`,
        end: '</p>'
    };
};

const customStyleToHTML = (style) => {
    if (style.startsWith('FONTSIZE-')) {
        const fontSize = style.split('-')[1];
        return `<span style="font-size:${fontSize}px">`;
    }
    if (style.startsWith('FONTFAMILY-')) {
        const fontFamily = style.split('-')[1];
        return `<span style="font-family:${fontFamily}">`;
    }
    return null;
};

export const convertToHTMLConfig = (editorState) => convertToHTML({
    blockToHTML: customBlockToHTML,
    styleToHTML: customStyleToHTML,
})(editorState.getCurrentContent());
