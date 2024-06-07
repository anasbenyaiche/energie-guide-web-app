import api from "../api/api";

/**
 * Fetch content blocks for a specific page by ID.
 * @param {string|number} pageId - The ID of the page.
 * @returns {Promise<Array>} - The list of content blocks.
 */
export const fetchContentBlocks = async (pageId) => {
  const response = await api.get(`/pages/${pageId}/blocks`);
  return response.data;
};

/**
 * Delete a content block by ID.
 * @param {string} id - The ID of the content block to delete.
 * @returns {Promise<void>}
 */
export const deleteContentBlock = async (id) => {
  try {
    await api.delete(`/blocks/${id}`);
  } catch (error) {
    console.error("Error deleting block:", error);
    throw error;
  }
};

/**
 * Update a content block.
 * @param {Object} updatedBlock - The updated content block object.
 * @returns {Promise<void>}
 */
export const updateContentBlock = async (updatedBlock) => {
  try {
    await api.put(`/blocks/${updatedBlock._id}`, updatedBlock);
  } catch (error) {
    console.error("Error updating block:", error);
    throw error;
  }
};
