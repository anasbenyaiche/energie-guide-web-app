import React, { useEffect } from 'react'
import UploadImage from './UploadImage';
import PropTypes from 'prop-types';

const EditUploadImage = ({ block, setImage, handleUpload }) => {


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
            />
        </div>
    )
}
EditUploadImage.propTypes = {
    block: PropTypes.object.isRequired,
    setImage: PropTypes.func.isRequired,
    handleUpload: PropTypes.func.isRequired
};

export default EditUploadImage
