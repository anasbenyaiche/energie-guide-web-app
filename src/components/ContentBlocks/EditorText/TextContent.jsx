import React, { useEffect, useState } from 'react';
import rawContentStateToHTML from '../../../utils/rawContentStateToHTML';
import PropTypes from 'prop-types';

const TextContent = ({ blocks }) => {
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        if (blocks.content) {
            try {
                const html = rawContentStateToHTML(blocks.content);
                setHtmlContent(html);
            } catch (error) {
                console.error("Error converting content:", error.message);
            }
        }
    }, [blocks.content]);

    return (
        <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
}

TextContent.propTypes = {
    blocks: PropTypes.object.isRequired,
};

export default TextContent;
