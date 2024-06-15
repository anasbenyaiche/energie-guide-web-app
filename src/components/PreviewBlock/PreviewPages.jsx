import React from 'react'
import propTypes from 'prop-types'
import PreviewFlow from '../ContentBlocks/PreviewFlow'
import PreviewImage from '../ContentBlocks/PreviewImage'

const PreviewPages = ({ blocks }) => {
    return (
        <div className='mb-3 p-3  text-black'>
            {blocks.type !== 'charts' && blocks.type !== 'image' && (
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
                <PreviewImage imageUrl={blocks.imageUrl} />
            )}
        </div>
    )
}

PreviewPages.propTypes = {
    blocks: propTypes.shape({
        content: propTypes.string.isRequired,
    }).isRequired,
}

export default PreviewPages
