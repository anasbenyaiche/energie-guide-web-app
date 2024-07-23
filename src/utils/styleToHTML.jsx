const styleToHTML = (style) => {
    if (style.startsWith('FONTFAMILY_')) {
        const fontFamily = style.replace('FONTFAMILY_', '').replace(/_/g, ' ');
        return `<span style="font-family:${fontFamily};">`;
    }
    if (style.startsWith('FONTSIZE_')) {
        const fontSize = style.replace('FONTSIZE_', '');
        return `<span style="font-size:${fontSize}px;">`;
    }
    if (style === 'BOLD') {
        return '<strong>';
    }
    return null;
};

export default styleToHTML;
