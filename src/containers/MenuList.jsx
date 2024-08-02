import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes, FaEdit } from "react-icons/fa";
import { getMenus, updateMenu, createMenu } from "../services/menuService";
import Select from "react-select";
import { MENU_OPTIONS } from "../constants/sideMenuPlacement";
import { MdOutlineEdit } from "react-icons/md";

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
  const customStyles = {
    control: (provided) => ({
      ...provided,
      background: '#e8f0fe',
      display: 'flex',
      flexWrap: 'nowrap',
      width: '100%',
      padding: '8px',
    }),
  };

  return (
    <div className=" max-w-3xl mx-auto mt-4">
      <h2 className="text-5xl font-medium text-primary-title">Menus List</h2>
      <div className="mb-4 mt-4 shadow-md p-4">
        <label htmlFor="placement" className="block mb-2 text-md  font-medium">
          Filtrer par emplacement
        </label>
        <Select
          id="placement"
          styles={customStyles}
          value={placement}
          onChange={handlePlacementChange}
          options={MENU_OPTIONS}
          isClearable
          placeholder="Sélectionner un emplacement..."

        />
      </div>

      {isEdit && (
        <div className="mb-4 mt-4 shadow-md p-4">
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium text-black">
              Titre
            </label>
            <input
              type="text"
              id="editMenuTitle"
              value={isEdit === "new" ? newMenuTitle : editedMenu.title}
              onChange={(e) => handleInputChange(e, "title")}
              className="rounded-md w-full border mt-2 bg-[#e8f0fe] border-gray-300 px-3 py-3 focus:outline-none focus:ring-1 focus:ring-gray-200"
              placeholder="Enter title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium text-black">
              Sous-titre
            </label>
            <input
              type="text"
              id="editMenuSubtitle"
              value={isEdit === "new" ? newMenuSubtitle : editedMenu.subtitle}
              onChange={(e) => handleInputChange(e, "subtitle")}
              className="rounded-md w-full border mt-2 bg-[#e8f0fe] border-gray-300 px-3 py-3 focus:outline-none focus:ring-1 focus:ring-gray-200"
              placeholder="Enter subtitle"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              className="flex items-center gap-2 bg-bg-btn px-5 py-3 text-white"
              onClick={isEdit === "new" ? handleCreateMenu : handleSaveEdit}
            >
              <FaCheck /> Save
            </button>
            {isEdit !== "new" && (
              <button
                className="bg-red-500 flex items-center justify-between gap-2 text-white px-2 py-1"
                onClick={handleCancelEdit}
              >
                <FaTimes /> Cancel
              </button>
            )}
          </div>
        </div>
      )}

      <ul className="grid grid-cols-1 gap-4 mb-4 mt-4 shadow-md p-4">
        {filteredMenus.map((menu) => (
          <li
            key={menu._id}
            className="flex items-center justify-between bg-bg-secondary p-4 rounded shadow"
          >
            {isEdit === menu._id ? null : (
              <>
                <div className="flex flex-col">
                  <span className="text-lg cursor-pointer text-[#0D335F]">
                    {menu.title}
                  </span>
                  <span className=" font-normal text-base text-black opacity-30">{menu.subtitle}</span>
                </div>
                <button
                  className=" flex items-center justify-between gap-6 bg-bg-btn px-5 py-3 text-white"
                  onClick={() => handleEditClick(menu._id)}
                >
                  <MdOutlineEdit className=" text-2xl" />
                  <span className=" uppercase"> éditer</span>
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
