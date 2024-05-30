import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { FaPlus } from "react-icons/fa";

const MenuItemsList = () => {
  const menuId = "664f50690d83ea62ca5e4f58";

  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await api.get(`/menu/${menuId}/items`);
        setMenuItems(response.data);
      } catch (err) {
        console.error("Failed to fetch menu items", err);
      }
    };

    if (menuId) {
      fetchMenuItems();
    }
  }, [menuId]);

  const handleMenuItemClick = (menuItemId) => {
    navigate(`/admin/edit-menu-item/${menuItemId}`); //navigation to menu item
  };

  const handleDeleteMenuItem = async (id) => {
    try {
      await api.delete(`/menu/items/${id}`);
      // Remove the deleted menuItem from the state
      setMenuItems(menuItems.filter((menuItem) => menuItem._id !== id));
    } catch (err) {
      console.error("Failed to delete menuItem", err);
    }
  };

  const handleAddMenuItem = () => {
    navigate("/admin/menu-item/create");
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Menu Items List</h2>
          <button
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleAddMenuItem}
          >
            <FaPlus className="mr-2" /> Add Menu Item
          </button>
        </div>
        <ul className="grid grid-cols-1 gap-4">
          {menuItems.map((menuItem) => (
            <li
              key={menuItem._id}
              className="flex items-center justify-between bg-gray-100 p-2 rounded shadow hover:bg-gray-200"
              onClick={() => handleMenuItemClick(menuItem._id)}
            >
              <span
                className="cursor-pointer text-blue-600 hover:underline "
                onClick={() => handleMenuItemClick(menuItem._id)}
              >
                {menuItem.title}
              </span>
              <div className="flex space-x-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  onClick={() => handleMenuItemClick(menuItem._id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  onClick={() => handleDeleteMenuItem(menuItem._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuItemsList;
