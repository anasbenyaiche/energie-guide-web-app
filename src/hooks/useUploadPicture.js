import { useState } from "react";
import api from "../api/api";

const useUploadPicture = ({ position, id, image, setOpenBlock, formPicture }) => {
    const [error, setError] = useState(null)

    const handleUpload = async () => {
        if (!image) return;
        let contentblock = {}
        contentblock = {
            type: 'image',
            content: formPicture.title,
            position: position,
            page_id: id,
            image: image
        };
        try {
            const uploadResponse = await api.post(`/upload-image`, contentblock, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const uploadedImageUrl = uploadResponse.data.imageUrl;
            setOpenBlock(false);
            console.log('Image uploaded successfully:', uploadedImageUrl);

        } catch (error) {
            setError(error)
        }
    }

    return { handleUpload, error }
}

export default useUploadPicture
