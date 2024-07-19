import React from 'react'
import StepsDisplay from './StepsDisplay'
import DOMPurify from 'dompurify';
const PreviewStepSectionEditor = ({ content }) => {
    let parsedContent = { text: '', steps: [] };

    try {
        parsedContent = JSON.parse(content);
    } catch (error) {
        console.error('Error parsing content:', error);
    }

    return (
        <div>
            <div
                className="text-content"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(parsedContent.text) }}
            />
            <StepsDisplay steps={parsedContent.steps} />
        </div>
    )
}

export default PreviewStepSectionEditor
