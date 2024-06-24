import { useState } from "react";
import api from "../api/api";

const useUpdateBlock = () => {
    const [error, setError] = useState(null)
    const updateBlockPositions = async (id, blocks) => {
        try {
            await api.put(`/pages/${id}/reorder-blocks`, { blocks });
            console.log('content block changed', blocks)
        } catch (error) {
            setError(error)
        }
    };


    return { updateBlockPositions, error }
}

export default useUpdateBlock
