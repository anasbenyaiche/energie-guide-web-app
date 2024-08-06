import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
const ModalEdit = ({ open, onClose, children }) => {
    return (
        <div
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
            >

                <div className="text-right">
                    <button className="text-black hover:focus:outline-none hover:focus-visible:border-none  bg-transparent border-none" onClick={onClose}>
                        <AiOutlineClose />
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}

export default ModalEdit
