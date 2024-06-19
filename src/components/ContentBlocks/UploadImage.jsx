import React, { useRef, useState } from 'react'
import upload from '../../assets/upload_image.png'
import PropTypes from 'prop-types';
const UploadImage = ({ image, setImage, handleUpload, formPicture, handleChangePicture }) => {
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
                <div className='mb-6  w-1/3'>
                    <label htmlFor="">Add alt for image</label>
                    <input value={formPicture.title} placeholder='Add your alt here' name="title"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-[#00a2d6] focus:outline-none focus:ring-0 focus:border-[#00a2d6] peer"
                        onChange={handleChangePicture}
                    />
                </div>
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
    handleUpload: PropTypes.func,
    handelchangePicture: PropTypes.func,
    formPicture: PropTypes.object
}


export default UploadImage
