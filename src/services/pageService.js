import api from "../api/api";

/**
 * Fetch content for a specific page.
 * @param {string} pageId - The ID of the page to fetch content for.
 * @returns {Promise<Array>} - A promise that resolves to an array of content blocks.
 */
export const getPageContent = async (pageId) => {
  try {
    const response = await api.get(`/pages/${pageId}`);
    return response.data.contentBlocks;
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error;
  }
};

/**
 * Fetch all pages.
 * @returns {Promise<Array>} - A promise that resolves to an array of pages.
 */
export const getPages = async () => {
  try {
    const response = await api.get("/pages");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch pages", error);
    throw error;
  }
};

/**
 * Create a new page.
 * @param {Object} pageData - The data for the new page.
 * @returns {Promise<Object>} - A promise that resolves to the created page.
 */
export const createPage = async (pageData) => {
  try {
    const response = await api.post("/pages", pageData);
    return response.data;
  } catch (error) {
    console.error("Failed to create page", error);
    throw error;
  }
};

/**
 * Fetch a single page by ID.
 * @param {string} id - The ID of the page.
 * @returns {Promise<Object>} - The page data.
 */
export const fetchPageById = async (id) => {
  const response = await api.get(`/pages/${id}`);
  return response.data.page;
};

/**
 * Update a page by ID.
 * @param {string} id - The ID of the page.
 * @param {Object} pageData - The updated page data.
 * @returns {Promise<Object>} - The updated page data.
 */
export const updatePageById = async (id, pageData) => {
  const response = await api.put(`/pages/${id}`, pageData);
  return response.data;
};

/**
 * Fetch related pages for menu items.
 * @returns {Promise<Array>} - List of related pages.
 */
export const fetchRelatedPages = async () => {
  const response = await api.get("/pages/related");
  return response.data;
};

/**
 * Delete a page by ID.
 * @param {string} id - The ID of the page to delete.
 * @returns {Promise<void>}
 */
export const deletePage = async (id) => {
  try {
    await api.delete(`/pages/${id}`);
  } catch (error) {
    console.error("Failed to delete page", error);
    throw error;
  }
};
