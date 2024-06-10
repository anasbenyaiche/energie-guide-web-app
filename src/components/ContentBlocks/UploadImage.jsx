import React, { useRef, useState } from 'react'
import upload from '../../assets/upload_image.png'
const UploadImage = () => {
    const [image, setImage] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const inputRef = useRef(null);

    const handelImageClick = () => {
        inputRef.current.click();
    }

    const handelImage = (e) => {
        console.log(e.target.files)
        const file = e.target.files[0]
        setImage(file)
        const url = URL.createObjectURL(file)
        setImageUrl(url)
    }
    return (
        <div className=' text-black w-4/5 mx-auto space-y-5 p-5 border rounded '>
            <div>
                <h2 className='text-center font-semibold  mb-4'>
                    {imageUrl ? (<p className='text-[#00a2d6]'> {image.name} </p>) : "Choose an image"}
                </h2>
                <div className='text-center' onClick={handelImageClick}>
                    {imageUrl ? (<img src={imageUrl} alt="Uploaded Image" />) : (<img className='mx-auto w-48 h-48 cursor-pointer' src={upload} alt="image upload" />)}
                    <input type="file" ref={inputRef} onChange={handelImage} className=' hidden' />
                    <button className=' mt-8 text-center  bg-[#00a2d6] border border-[#00a2d6] text-white px-5 py-2 hover:border-[#00a2d6] '>Upload</button>
                </div>

            </div>
        </div>
    )
}

export default UploadImage
