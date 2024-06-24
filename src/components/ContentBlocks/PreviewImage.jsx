import React from 'react'

const PreviewImage = ({ imageUrl, title }) => {
    const baseURL = "http://localhost:5000";
    return (
        <div>
            <div className='text-center'>
                <img src={`${baseURL}${imageUrl}`} alt={title} className='mx-auto' />
            </div>
        </div>
    )
}

export default PreviewImage
