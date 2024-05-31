import React from 'react'
import propTypes from 'prop-types'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoMdMove } from "react-icons/io";

const ListContent = ({ blocks, onDelete, onEdit, ...props }) => {
    return (
        <div className='mb-3 p-3 border rounded text-black'
            {...props} >
            <div className='gap-4 flex items-center justify-between mb-2'>
                <div className='text-sm text-gray-500'>
                    Block Position: {blocks.position}
                </div>
                <div className='flex justify-center items-center'>
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
