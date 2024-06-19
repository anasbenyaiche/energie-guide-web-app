import { useState } from "react"
import api from "../api/api"


const useDisplayBlock = () => {
    const [error, setError] = useState(null)

    const displaycontent = async (id, setContent, recalculatePositions) => {
        try {
            const response = await api.get(`/pages/${id}`);
            const sortedContent = response.data.contentBlocks.sort((a, b) => a.position - b.position);
            setContent(sortedContent);
            recalculatePositions(response.data.contentBlocks);
        } catch (error) {
            setError(error)
        }
    }
    return { displaycontent, error }
}

export default useDisplayBlock
