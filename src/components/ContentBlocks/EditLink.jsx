import React, { useEffect, useState } from 'react'
import CreateLink from './CreateLink';
import createLinkHTML from './createLinkHTML';

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
                <div className="flex justify-end mt-4 gap-3">
                    <button className="bg-red-500 text-white px-4 py-2 mr-2" onClick={onClose}>Cancel</button>
                    <button className="bg-blue-500 text-white px-4 py-2" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default EditLink
