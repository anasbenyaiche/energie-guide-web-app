import React, { useRef, useState } from 'react'
import upload from '../../assets/upload_image.png'
import PropTypes from 'prop-types';
const UploadImage = ({ image, setImage, handleUpload }) => {
    const [imageUrl, setImageUrl] = useState('');
    const inputRef = useRef(null);

    const handleImageClick = () => {
        inputRef.current.click();
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        const url = URL.createObjectURL(file);
        setImageUrl(url);
    };


    return (
        <div className='text-black w-4/5 mx-auto space-y-5 p-5 border rounded'>
            <div>
                <h2 className='text-center font-semibold mb-4'>
                    {imageUrl ? (
                        <p className='text-[#00a2d6]'>{image.name}</p>
                    ) : (
                        "Choose an image"
                    )}
                </h2>
                <div className='text-center' onClick={handleImageClick}>
                    {imageUrl ? (
                        <img src={imageUrl} alt="Uploaded Image" />
                    ) : (
                        <img className='mx-auto w-48 h-48 cursor-pointer' src={upload} alt="image upload" />
                    )}
                    <input type="file" ref={inputRef} onChange={handleImageChange} className='hidden' />
                </div>
                <div className=' flex items-center justify-between'>
                    {imageUrl && (
                        <div onClick={handleImageClick}>
                            <img src={upload} alt="image upload" className=' w-28' />
                        </div>
                    )}
                    <button onClick={handleUpload} className='mt-8 text-center bg-[#00a2d6] border
                 border-[#00a2d6] text-white px-5 py-2 hover:border-[#00a2d6]'>
                        Upload
                    </button>
                </div>
            </div>
        </div>
    )
}

UploadImage.propTypes = {
    image: PropTypes.object,
    setImageUrl: PropTypes.func,
    handleUpload: PropTypes.func
}


export default UploadImage