import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { IoMdArrowDropright } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import {
  getMenus,
  fetchMenuItems,
  deleteMenuItem,
} from "../services/menuItemService";

const EditMenuForm = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMenus = async () => {
      try {
        const menusData = await getMenus();
        setMenus(menusData);
      } catch (err) {
        console.error("Failed to fetch menus", err);
      }
    };

    loadMenus();
  }, []);

  useEffect(() => {
    if (selectedMenuId) {
      const loadMenuItems = async () => {
        try {
          const itemsData = await fetchMenuItems(selectedMenuId);
          setMenuItems(itemsData);
        } catch (err) {
          console.error("Failed to fetch menu items", err);
        }
      };

      loadMenuItems();
    }
  }, [selectedMenuId]);

  const handleMenuItemClick = (menuItemId) => {
    navigate(`/admin/edit-menu-item/${menuItemId}`);
  };

  const handleDeleteMenuItem = async (id) => {
    try {
      await deleteMenuItem(id);
      setMenuItems(menuItems.filter((menuItem) => menuItem._id !== id));
    } catch (err) {
      console.error("Failed to delete menuItem", err);
    }
  };

  const handleAddMenuItem = () => {
    navigate("/admin/menu-item/create");
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedMenuId(selectedOption.value);
  };

  const menuOptions = menus.map((menu) => ({
    value: menu._id,
    label: menu.title,
  }));

  return (
    <div className=" max-w-3xl mx-auto mt-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-5xl font-medium text-primary-title">Menu Items List</h2>
        <button
          className=" flex items-center justify-between gap-2 bg-bg-btn px-5 py-3 text-white"
          onClick={handleAddMenuItem}
        >
          <FaPlus className="mr-2" /> Ajouter un élément de menu
        </button>
      </div>
      <div className="mb-4">
        <label
          htmlFor="menu-select"
          className="block font-medium text-black mb-2"
        >
          Select the Menu
        </label>
        <Select
          id="menu-select"
          options={menuOptions}
          onChange={handleSelectChange}
          placeholder="Select a menu"
          className="mb-4"
        />
      </div>
      <div className="mb-6">
        <ul className="grid grid-cols-1 gap-4">
          {menuItems.map((menuItem) => (
            <li
              key={menuItem._id}
              className="flex items-center justify-between bg-white p-2 rounded shadow-lg"
            >
              <span
                className="cursor-pointer flex items-center text-secondary-title font-medium text-lg"
                onClick={() => handleMenuItemClick(menuItem._id)}
              >
                <IoMdArrowDropright />
                {menuItem.title}
              </span>
              <div className="flex space-x-2">
                <button
                  className=" bg-bg-btn text-white text-sm p-2 rounded"
                  onClick={() => handleMenuItemClick(menuItem._id)}
                >
                  Mettre à jour
                </button>
                <button
                  className="bg-red-500 text-white p-2 text-sm  rounded"
                  onClick={() => handleDeleteMenuItem(menuItem._id)}
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EditMenuForm;
