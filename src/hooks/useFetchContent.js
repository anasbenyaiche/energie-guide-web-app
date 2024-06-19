import { useState, useEffect } from "react";
import api from "../api/api";
const useFetchContent = (id) => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            if (id) {
                try {
                    const response = await api.get(`/pages/${id}`);
                    const sortedContent = response.data.contentBlocks.sort((a, b) => a.position - b.position);
                    setContent(sortedContent);
                    recalculatePositions(response.data.contentBlocks);
                } catch (err) {
                    setError(err);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchContent();
    }, [id]);

    return { content, loading, error };
};


export default useFetchContent
