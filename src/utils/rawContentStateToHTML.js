import draftToHtml from 'draftjs-to-html';

const rawContentStateToHTML = (rawContentState) => {
    const html = draftToHtml(rawContentState);
    return html;
};

export default rawContentStateToHTML;
