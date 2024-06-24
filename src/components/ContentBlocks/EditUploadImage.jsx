import React, { useEffect } from 'react'
import UploadImage from './UploadImage';
import PropTypes from 'prop-types';

const EditUploadImage = ({ block, setImage, handleUpload, handleChangePicture, formPicture }) => {


    useEffect(() => {
        if (block && block.content) {

            setImage(block.content);
        }
    }, [])

    return (
        <div>
            <UploadImage
                image={block.content}
                setImage={setImage}
                handleUpload={handleUpload}
                handleChangePicture={handleChangePicture}
                formPicture={formPicture}
            />
        </div>
    )
}
EditUploadImage.propTypes = {
    block: PropTypes.object.isRequired,
    setImage: PropTypes.func.isRequired,
    handleUpload: PropTypes.func.isRequired,
    handleChangePicture: PropTypes.func.isRequired,
    formPicture: PropTypes.object.isRequired,
};

export default EditUploadImage
