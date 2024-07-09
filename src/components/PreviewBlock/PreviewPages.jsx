import React, { useState } from 'react'
import propTypes from 'prop-types'
import PreviewFlow from '../ContentBlocks/PreviewFlow'
import PreviewImage from '../ContentBlocks/PreviewImage'
import PreviewCollapsible from '../ContentBlocks/PreviewCollapsible'

const PreviewPages = ({ blocks }) => {
    const [openQuestion, setOpenQuestion] = useState(null);
    const [visibleQuestion, setVisibleQuestion] = useState(10)
    const [showall, setshawall] = useState(false)
    let content;

    if (blocks.type === 'qasection') {
        try {
            content = JSON.parse(blocks.content);
        } catch (error) {
            console.error("Error parsing content:", error);
        }
    }
    const handleallQuestion = () => {
        if (showall) {
            setVisibleQuestion(10)
        }
        else {
            setVisibleQuestion(content.length)
        }

        setshawall(!showall)

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
            {blocks.type === 'qasection' && content && (
                <>
                    {content.slice(0, visibleQuestion).map((qa, index) => (
                        <PreviewCollapsible key={index} index={index} question={qa.question} response={qa.response}
                            openQuestion={openQuestion}
                            setOpenQuestion={setOpenQuestion}
                        />
                    ))}

                    {content.length > 10 && (
                        <div className=' flex justify-end'>
                            <div className='inline-flex justify-end items-center mt-5 gap-3 text-end px-4 btnquestion'>
                                <button className=' text-[#008AEE] hover:text-black' onClick={handleallQuestion}>
                                    {showall ? 'Voir moin' : 'Voir plus'}
                                </button>
                                <hr className=" w-16 h-1 bg-[#008AEE]" />
                            </div>
                        </div>
                    )}
                </>
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
