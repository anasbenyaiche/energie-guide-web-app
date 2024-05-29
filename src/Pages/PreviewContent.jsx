import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import ListContent from '../components/ContentBlocks/ListContent'
import EditModal from '../components/ContentBlocks/EditModal'

const PreviewContent = () => {
    const [content, setContent] = useState([])
    const token = localStorage.getItem('token');
    const [selectedBlock, setSelectedBlock] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    useEffect(() => {
        const displaycontent = async () => {

            try {
                const endPoint =
                    process.env.NODE_ENV === "development"
                        ? "http://localhost:5000/api/"
                        : "https://energie-guide-web-app.vercel.app/api";

                const response = await axios.get(`${endPoint}pages/6655ac8de8c07edccd0b2cb1`)
                setContent(response.data.contentBlocks)
                recalculatePositions(response.data.contentBlocks);

            } catch (error) {
                console.log('Error catched Block:', error)
            }
        }
        displaycontent()
    }, [])

    const handelDelete = async (id) => {
        try {
            const endPoint =
                process.env.NODE_ENV === "development"
                    ? "http://localhost:5000/api/"
                    : "https://energie-guide-web-app.vercel.app/api";

            await axios.delete(`${endPoint}blocks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setContent(content.filter((block) => block._id !== id))

        } catch (error) {
            console.log('Error catched Block:', error)
        }
    }
    const handleEdit = (block) => {
        setSelectedBlock(block);
        setIsEditModalOpen(true);
    };

    const handleSave = async (updatedBlock) => {
        try {
            const endPoint =
                process.env.NODE_ENV === "development"
                    ? "http://localhost:5000/api/"
                    : "https://energie-guide-web-app.vercel.app/api";

            await axios.put(`${endPoint}blocks/${updatedBlock._id}`, updatedBlock, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setContent(content.map((block) => (block._id === updatedBlock._id ? updatedBlock : block)));
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Error updating content:', error);

        }
    }

    const dragBlock = useRef(0)
    const dragOverBlock = useRef(0)


    const handelSort = () => {
        const blockClone = [...content];
        const temp = blockClone[dragBlock.current];
        blockClone[dragBlock.current] = blockClone[dragOverBlock.current];
        blockClone[dragOverBlock.current] = temp;
        recalculatePositions(blockClone);
    }


    const recalculatePositions = (blocks) => {
        blocks.forEach((block, index) => {
            block.position = index;
        });
        setContent([...blocks]);
        localStorage.setItem('position', blocks.length - 1);
    }


    console.log(content)


    return (
        <div className=' max-w-7xl my-8 mx-auto'>
            <div className=' flex items-center justify-between'>
                <h1 className='text-2xl font-semibold'>Preview Content</h1>
            </div>
            <div className=' bg-white shadow-md p-4 mt-5 rounded-md'>
                {content.length > 0 ? (
                    content.map((item, index) => (
                        <ListContent key={item._id} blocks={item}
                            onDelete={handelDelete}
                            onEdit={() => handleEdit(item)}
                            draggable
                            onDragStart={() => dragBlock.current = index}
                            onDragEnter={() => dragOverBlock.current = index}
                            onDragEnd={handelSort}
                            onDragOver={(e) => e.preventDefault()}

                        />
                    ))
                ) :
                    <h2>No content fo the moment</h2>
                }
            </div>
            {isEditModalOpen && (
                <EditModal
                    block={selectedBlock}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    )
}

export default PreviewContent
