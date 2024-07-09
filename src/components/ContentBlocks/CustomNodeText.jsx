import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";

const CustomNodeText = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <div className={`floating-menu ${isOpen ? 'open' : ''}`}>
                <div className='cursor-pointer flex justify-end mb-5' onClick={toggleMenu}>
                    <IoMdClose className=' text-black text-2xl' /></div>
                <div className='break-words text-black' dangerouslySetInnerHTML={{ __html: data?.text || '' }} />
            </div>
        </>
    )
}

export default CustomNodeText
