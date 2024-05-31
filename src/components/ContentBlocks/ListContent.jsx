import React from 'react'
import propTypes from 'prop-types'
const ListContent = ({ blocks, onDelete, onEdit, ...props }) => {
    return (
        <div className='mb-3 p-3 border rounded text-black'
            {...props} >
            <div className='gap-4 flex items-center justify-start mb-2'>
                <div className='text-sm text-gray-500'>
                    Block Position: {blocks.position}
                </div>
                <div>
                    <button className='mr-3 text-blue-500 hover:underline'
                        onClick={() => onDelete(blocks._id)}>Delete</button>
                </div>
                <div>
                    <button className='mr-3 text-blue-500 hover:underline'
                        onClick={() => onEdit(blocks._id)}>Edit</button>
                </div>
                <div className=' cursor-move mr-3 text-blue-500 hover:underline'>
                    Move
                </div>
            </div>
            <div
                dangerouslySetInnerHTML={{
                    __html: blocks.content,
                }}
            />
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
