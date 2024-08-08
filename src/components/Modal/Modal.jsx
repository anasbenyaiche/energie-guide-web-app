import React from "react";

import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ open, onClose, children }) => {

    return (
        <div
            onClick={onClose}
            className={`block absolute lg:fixed inset-0 lg:flex justify-center items-center transition-colors z-10 ${open ? "visible lg:bg-black/40 bg-seconder" : "invisible"
                }`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white lg:max-w-3xl rounded-3xl max-lg:border-b-[5px]  mx-auto lg:rounded-3xl shadow w-full  px-5 py-3 transition-all ease-in-out duration-1000 
                ${open
                        ? "lg:scale-100 opacity-100 max-lg:top-0"
                        : "lg:scale-125 opacity-0 max-lg:top-[-1000px]"
                    }`}
            >

                <div className="text-right">
                    <button className="text-black hover:focus:outline-none hover:focus-visible:border-none  bg-transparent border-none" onClick={onClose}>
                        <AiOutlineClose />
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
