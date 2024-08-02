import React, { useEffect, useState } from 'react'
import StepsDisplay from './StepsDisplay'
import rawContentStateToHTML from '../../../utils/rawContentStateToHTML';

const PreviewStepSectionEditor = ({ blocks }) => {
    const [htmlContent, setHtmlContent] = useState('');
    const [steps, setSteps] = useState([]);

    useEffect(() => {
        if (blocks.content) {
            try {
                const parsedContent = JSON.parse(blocks.content);

                if (parsedContent.text && parsedContent.text.blocks) {
                    const html = rawContentStateToHTML(parsedContent.text);
                    setHtmlContent(html);
                }

                if (parsedContent.steps) {
                    setSteps(parsedContent.steps);
                }
            } catch (error) {
                console.error("Error converting content:", error.message);
            }
        }
    }, [blocks.content]);
    return (
        <div>
            <div
                className="text-content"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
            <StepsDisplay steps={steps} />
        </div>
    )
}

export default PreviewStepSectionEditor
