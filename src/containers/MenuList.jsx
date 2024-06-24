import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes, FaEdit } from "react-icons/fa";
import { getMenus, updateMenu, createMenu } from "../services/menuService";
import Select from "react-select";
import { MENU_OPTIONS } from "../constants/sideMenuPlacement";

const MenuList = () => {
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [placement, setPlacement] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const [editedMenu, setEditedMenu] = useState(null);
  const [newMenuTitle, setNewMenuTitle] = useState("");
  const [newMenuSubtitle, setNewMenuSubtitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const menusData = await getMenus();
        setMenus(menusData);
        filterMenus(menusData, placement);
      } catch (err) {
        console.error("Failed to fetch menus", err);
      }
    };

    fetchMenus();
  }, [placement]);

  const filterMenus = (menusData, selectedPlacement) => {
    if (selectedPlacement) {
      const filtered = menusData.filter(
        (menu) => menu.placement === selectedPlacement.value
      );
      setFilteredMenus(filtered);
      setIsEdit(filtered.length === 0 ? "new" : null);
    } else {
      setFilteredMenus(menusData);
      setIsEdit(null);
    }
  };

  const handlePlacementChange = (selectedOption) => {
    setPlacement(selectedOption);
    filterMenus(menus, selectedOption);
  };

  const handleEditClick = (menuId) => {
    setIsEdit(menuId);
    const menuToEdit = menus.find((menu) => menu._id === menuId);
    setEditedMenu({ ...menuToEdit });
  };

  const handleCancelEdit = () => {
    setIsEdit(null);
    setNewMenuTitle("");
    setNewMenuSubtitle("");
    setEditedMenu(null);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedMenu = await updateMenu(editedMenu._id, editedMenu);
      const updatedMenus = menus.map((menu) =>
        menu._id === updatedMenu._id ? updatedMenu : menu
      );
      setMenus(updatedMenus);
      filterMenus(updatedMenus, placement);
      setIsEdit(null);
      setEditedMenu(null);
    } catch (err) {
      console.error("Failed to update menu", err);
    }
  };

  const handleCreateMenu = async () => {
    try {
      const newMenuData = {
        title: newMenuTitle,
        subtitle: newMenuSubtitle,
        placement: placement.value,
      };
      const createdMenu = await createMenu(newMenuData);
      setMenus([...menus, createdMenu]);
      filterMenus([...menus, createdMenu], placement);
      setIsEdit(null);
      setNewMenuTitle("");
      setNewMenuSubtitle("");
    } catch (err) {
      console.error("Failed to create menu", err);
    }
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    if (isEdit === "new") {
      if (field === "title") {
        setNewMenuTitle(value);
      } else if (field === "subtitle") {
        setNewMenuSubtitle(value);
      }
    } else {
      setEditedMenu((prevMenu) => ({
        ...prevMenu,
        [field]: value,
      }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Menus List</h2>
      </div>

      <div className="mb-4">
        <label htmlFor="placement" className="block mb-2 text-sm font-medium">
          Filter by Placement
        </label>
        <Select
          id="placement"
          value={placement}
          onChange={handlePlacementChange}
          options={MENU_OPTIONS}
          isClearable
          placeholder="Select placement..."
          className="border rounded p-2"
        />
      </div>

      {isEdit && (
        <div className="bg-gray-100 p-4 rounded shadow mb-4">
          <label
            htmlFor="editMenuTitle"
            className="block mb-1 text-sm font-medium"
          >
            Title
          </label>
          <input
            type="text"
            id="editMenuTitle"
            value={isEdit === "new" ? newMenuTitle : editedMenu.title}
            onChange={(e) => handleInputChange(e, "title")}
            className="w-full border rounded p-2 mb-2"
            placeholder="Enter title"
          />
          <label
            htmlFor="editMenuSubtitle"
            className="block mb-1 text-sm font-medium"
          >
            Subtitle
          </label>
          <input
            type="text"
            id="editMenuSubtitle"
            value={isEdit === "new" ? newMenuSubtitle : editedMenu.subtitle}
            onChange={(e) => handleInputChange(e, "subtitle")}
            className="w-full border rounded p-2 mb-2"
            placeholder="Enter subtitle"
          />
          <div className="flex justify-end space-x-2">
            <button
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
              onClick={isEdit === "new" ? handleCreateMenu : handleSaveEdit}
            >
              <FaCheck /> Save
            </button>
            {isEdit !== "new" && (
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                onClick={handleCancelEdit}
              >
                <FaTimes /> Cancel
              </button>
            )}
          </div>
        </div>
      )}

      <ul className="grid grid-cols-1 gap-4">
        {filteredMenus.map((menu) => (
          <li
            key={menu._id}
            className="flex items-center justify-between bg-gray-100 p-4 rounded shadow hover:bg-gray-200"
          >
            {isEdit === menu._id ? null : (
              <>
                <div className="flex flex-col">
                  <span className="font-semibold text-lg cursor-pointer text-blue-600 hover:underline">
                    {menu.title}
                  </span>
                  <span className="text-sm text-gray-600">{menu.subtitle}</span>
                </div>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  onClick={() => handleEditClick(menu._id)}
                >
                  <FaEdit /> Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
