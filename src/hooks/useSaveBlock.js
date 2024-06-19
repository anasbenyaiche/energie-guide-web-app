import { useState } from "react"
import api from "../api/api"

const useSaveBlock = () => {
    const [error, setError] = useState(null)


    const saveBlock = async (updatedBlock, setContent, content) => {

        try {
            await api.put(`/blocks/${updatedBlock._id}`, updatedBlock, {});
            setContent(
                content.map((block) =>
                    block._id === updatedBlock._id ? updatedBlock : block
                )
            );
        } catch (error) {
            setError(error)
        }

    }

    return { saveBlock, error };
}

export default useSaveBlock
