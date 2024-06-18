import api from "../api/api";

/**
 * Fetch all menus.
 * @returns {Promise<Array>} - List of menus.
 */
export const getMenus = async () => {
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

/**
 * Update a menu.
 * @param {string} menuId - The ID of the menu to which will be updated.
 * @param {Object} menuData - The data for the  menu .
 * @returns {Promise<Object>} - The created menu item.
 */
export const updateMenu = async (menuItemId, menuData) => {
  const response = await api.put(`/menus/${menuItemId}`, menuData);
  return response.data;
};

/**
 * Update a menu.
 * @param {string} menuId - The ID of the menu to which will be updated.
 * @param {Object} menuData - The data for the  menu .
 * @returns {Promise<Object>} - The created menu item.
 */
export const createMenu = async (menuData) => {
  const response = await api.post(`/menus`, menuData);
  return response.data;
};
