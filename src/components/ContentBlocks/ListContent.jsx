import React, { useState } from 'react'
import propTypes from 'prop-types'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoMdMove } from "react-icons/io";
import PreviewFlow from './PreviewFlow';
import PreviewImage from './PreviewImage';
import PreviewCollapsible from './PreviewCollapsible';


const ListContent = ({ blocks, onDelete, onEdit, ...props }) => {

    const [visibleQuestion, setVisibleQuestion] = useState(10)
    const [showall, setshawall] = useState(false)
    const [openQuestion, setOpenQuestion] = useState(null);
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
        <div className='mb-3 p-3 border rounded text-black' {...props} >
            <div className='gap-4 flex items-center justify-between mb-2'>
                <div className='text-sm text-gray-500'>
                    Block Position: {blocks.position}
                </div>
                <div className='flex justify-center items-center gap-3'>
                    <div>
                        <button className='bg-transparent  border-none  focus:outline-none '
                            onClick={() => onEdit(blocks._id)}>  <MdEdit className=' text-blue-600' /> </button>
                    </div>
                    <div className=' cursor-move hover:underline'>
                        <IoMdMove />
                    </div>
                    <div>
                        <button className=' bg-transparent  border-none   focus:outline-none'
                            onClick={() => onDelete(blocks._id)}> <MdOutlineDeleteOutline className=' text-red-500 text-xl' /> </button>
                    </div>
                </div>

            </div>
            {blocks.type !== 'charts' && blocks.type !== 'image' && blocks.type !== 'qasection' && (
                <div
                    dangerouslySetInnerHTML={{
                        __html: blocks.content,
                    }}
                />
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


            {blocks.type === 'charts' && (
                <PreviewFlow content={blocks.content} />
            )}
            {blocks.type === 'image' && (
                <PreviewImage imageUrl={blocks.imageUrl} title={blocks.content} />
            )}
        </div>
    )
}
ListContent.propTypes = {
    blocks: propTypes.shape({
        _id: propTypes.string.isRequired,
        position: propTypes.number.isRequired,
        content: propTypes.string.isRequired,
    }).isRequired,
    onDelete: propTypes.func.isRequired,
    onEdit: propTypes.func.isRequired
}

export default ListContent
