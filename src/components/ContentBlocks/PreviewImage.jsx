import React from 'react'

const PreviewImage = ({ imageUrl }) => {
    const baseURL = "http://localhost:5000/uploads";
    return (
        <div>
            <div className='text-center'>
                <img src={`${baseURL}${imageUrl}`} alt="Uploaded Preview" className='mx-auto' />
            </div>
        </div>
    )
}

export default PreviewImage
