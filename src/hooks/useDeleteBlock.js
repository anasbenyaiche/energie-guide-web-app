import { useState } from "react"
import api from "../api/api"

const useDeleteBlock = () => {

    const [error, setError] = useState(null)


    const deleteBlock = async (id, setContent, content) => {
        try {
            await api.delete(`/blocks/${id}`)
            setContent(content.filter((block) => block._id !== id));
        }
        catch (error) {
            setError(error)
        }
    }


    return { deleteBlock, error }
}

export default useDeleteBlock
