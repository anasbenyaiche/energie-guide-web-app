const blockStyleFn = (block) => {
    const textAlign = block.getData().get('text-align');
    const fontSize = block.getData().get('font-size');
    const fontFamily = block.getData().get('font-family');
    const styles = {};
    if (textAlign) styles.textAlign = textAlign;
    if (fontSize) styles.fontSize = `${fontSize}px`;
    if (fontFamily) styles.fontFamily = fontFamily;
    return Object.keys(styles).length ? { style: styles } : null;
};

export default blockStyleFn;
