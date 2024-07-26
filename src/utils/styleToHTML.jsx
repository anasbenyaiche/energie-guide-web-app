const styleToHTML = (style) => {
    if (style.startsWith('FONTFAMILY_')) {
        const fontFamily = style.replace('FONTFAMILY_', '');
        return `<span style="font-family:${fontFamily};">`;
    }
    if (style.startsWith('FONTSIZE_')) {
        const fontSize = style.replace('FONTSIZE_', '');
        return `<span style="font-size:${fontSize}px;">`;
    }
    return null;
};

export default styleToHTML;
