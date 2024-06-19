import { useEffect, useState } from "react";
import api from "../api/api";
const useFetchPageData = (pageId) => {

    const [pageData, setPageData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchPageData = async () => {
            if (pageId) {

                try {
                    const response = await api.get(`/pages/${pageId}`);
                    const sortedContentBlocks = response.data.contentBlocks.sort((a, b) => a.position - b.position);
                    setPageData({ ...response.data, contentBlocks: sortedContentBlocks })
                }
                catch (err) {
                    setError(err)
                }
                finally {
                    setLoading(false)
                }
            }
        }
        fetchPageData()

    }, [pageId])

    return { pageData, loading, error };

}

export default useFetchPageData