import api from "../api/api";

/**
 * Fetch all menus.
 * @returns {Promise<Array>} - List of menus.
 */
export const fetchMenus = async () => {
  const response = await api.get("/menus");
  return response.data;
};

/**
 * Fetch the sidebar menu data from the API.
 * @returns {Promise<Object>} - Sidebar menu data.
 * @throws {Error} - If fetching sidebar menu data fails.
 */
export const getQueryMenu = async (query) => {
  try {
    const response = await api.get(`/menus/extract?${query}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch sidebar menu data:", error);
    throw error;
  }
};
