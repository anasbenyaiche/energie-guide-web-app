import React from 'react'
import { IoCloseOutline } from 'react-icons/io5'

const LeftSidebar = ({ isOpen, onClose, children }) => {
    return (
        <div>
            <div className={`leftsidebar ${isOpen ? 'active' : ''}`}>
                <div className=' p-2 flex justify-end'>
                    <div className="text-3xl cursor-pointer  text-black" onClick={onClose}><IoCloseOutline /></div>
                </div>
                <div className='lfsd-body px-4'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar
