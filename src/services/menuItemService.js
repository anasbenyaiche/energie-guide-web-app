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
 * Fetch menu items for a specific menu by menu ID.
 * @param {string} menuId - The ID of the menu.
 * @returns {Promise<Array>} - List of menu items.
 */
export const fetchMenuItems = async (menuId) => {
  const response = await api.get(`/menu/${menuId}/items`);
  return response.data;
};

/**
 * Create a new menu item.
 * @param {string} menuId - The ID of the menu to which the item will be added.
 * @param {Object} menuItemData - The data for the new menu item.
 * @returns {Promise<Object>} - The created menu item.
 */
export const createMenuItem = async (menuId, menuItemData) => {
  const response = await api.post(`/menu/${menuId}/items`, menuItemData);
  return response.data;
};
/**
 * Get a menu item by ID.
 * @param {string} menuItemId - The ID of the menu item.
 * @returns {Promise} - Menu item .
 */
export const getMenuItembyId = async (menuItemId) => {
  const response = await api.get(`/menu/items/${menuItemId}`);
  return response.data;
};

/**
 * Delete a menu item by ID.
 * @param {string} menuItemId - The ID of the menu item.
 * @returns {Promise} - Deletion response.
 */
export const deleteMenuItem = async (menuItemId) => {
  await api.delete(`/menu/items/${menuItemId}`);
};

/**
 * Update a menu item.
 * @param {string} menuId - The ID of the menu to which the item will be added.
 * @param {Object} menuItemData - The data for the new menu item.
 * @returns {Promise<Object>} - The created menu item.
 */
export const updateMenuItem = async (menuItemId, menuItemData) => {
  const response = await api.put(`/menu/items/${menuItemId}`, menuItemData);
  return response.data;
};
