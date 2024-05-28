import axios from 'axios'
import React, { useEffect, useState } from 'react'

const PreviewContent = () => {
    const [content, setContent] = useState([])

    useEffect(() => {
        const displaycontent = async () => {

            try {
                const endPoint =
                    process.env.NODE_ENV === "development"
                        ? "http://localhost:5000/api/"
                        : "https://energie-guide-web-app.vercel.app/api";

                const response = await axios.get(`${endPoint}pages/6655ac8de8c07edccd0b2cb1`)
                setContent(response.data.contentBlocks)

            } catch (error) {
                console.log('Error catched Block:', error)
            }
        }
        displaycontent()
    }, [])

    console.log(content)

    return (
        <div className=' max-w-7xl my-8 mx-auto'>
            <div className=' flex items-center justify-between'>
                <h1 className='text-2xl font-semibold'>Preview Content</h1>
            </div>
            <div className=' bg-white shadow-md p-4 mt-5 rounded-md'>
                {content.length > 0 ? (
                    content.map((item) => (
                        <div className='mb-3 p-3 border rounded' key={item._id}>
                            <div className='text-sm text-gray-500 mb-2'>
                                Block Position: {item.position}
                            </div>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: item.content,
                                }}
                            />
                        </div>
                    ))
                ) :
                    <h2>No content fo the moment</h2>
                }
            </div>
        </div>
    )
}

export default PreviewContent
