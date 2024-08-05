const blockStyleFn = (block) => {
    const textAlign = block.getData().get('text-align');
    const styles = {};
    if (textAlign) {
        styles.textAlign = textAlign;
    }
    return Object.keys(styles).length ? { style: styles } : null;
};

export default blockStyleFn;
