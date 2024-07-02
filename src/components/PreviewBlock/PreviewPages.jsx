import React, { useState } from 'react'
import propTypes from 'prop-types'
import PreviewFlow from '../ContentBlocks/PreviewFlow'
import PreviewImage from '../ContentBlocks/PreviewImage'
import PreviewCollapsible from '../ContentBlocks/PreviewCollapsible'

const PreviewPages = ({ blocks }) => {
    const [openQuestion, setOpenQuestion] = useState(null);
    let content;

    if (blocks.type === 'qasection') {
        try {
            content = JSON.parse(blocks.content);
        } catch (error) {
            console.error("Error parsing content:", error);
        }
    }
    return (
        <div className='mb-3 p-3  text-black'>
            {blocks.type !== 'charts' && blocks.type !== 'image' && blocks.type !== 'qasection' && (
                <div
                    dangerouslySetInnerHTML={{
                        __html: blocks.content,
                    }}
                />
            )}

            {blocks.type === 'charts' && (
                <PreviewFlow content={blocks.content} />
            )}
            {blocks.type === 'image' && (
                <PreviewImage imageUrl={blocks.imageUrl} title={blocks.content} />
            )}
            {blocks.type === 'qasection' && content && content.map((qa, index) => (
                <PreviewCollapsible key={index} index={index} question={qa.question} response={qa.response}
                    openQuestion={openQuestion}
                    setOpenQuestion={setOpenQuestion}
                />
            ))}
        </div>
    )
}

PreviewPages.propTypes = {
    blocks: propTypes.shape({
        content: propTypes.string.isRequired,
    }).isRequired,
}

export default PreviewPages
