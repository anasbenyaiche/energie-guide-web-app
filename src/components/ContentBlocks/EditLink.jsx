import React, { useEffect, useState } from 'react'
import CreateLink from './CreateLink';
import createLinkHTML from './createLinkHTML';
import { FaPlus } from 'react-icons/fa';
import { HiMiniXMark } from "react-icons/hi2";
const EditLink = ({ block, onClose, onSave }) => {
    const [formLink, setFormLink] = useState({
        link: '',
        title: '',
    });

    useEffect(() => {
        if (block && block.content) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(block.content, 'text/html');
            const anchor = doc.querySelector('a');
            if (anchor) {
                setFormLink({
                    link: anchor.href,
                    title: anchor.textContent
                });
            }
        }
    }, [block]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormLink({ ...formLink, [name]: value });
    };

    const handleSave = () => {
        const updatedBlock = { ...block, content: createLinkHTML(formLink.link, formLink.title) };
        onSave(updatedBlock);
    };
    return (
        <div className="modal">
            <div className="modal-content">
                <CreateLink
                    formLink={formLink}
                    handelChange={handleChange}
                />
                <div className="flex justify-end mt-6 gap-5">
                    <button onClick={onClose} className="bg-red-500 flex gap-2 justify-between items-center text-white px-3 py-3 ml-2">
                        <HiMiniXMark className='text-2xl' /> Annuler</button>
                    <button onClick={handleSave} className=" flex items-center justify-between gap-2 bg-bg-btn px-3 py-3 text-white">
                        <FaPlus className="mr-2" />Enregistrer</button>
                </div>
            </div>
        </div>
    )
}

export default EditLink
