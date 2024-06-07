import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { fetchMenus } from "../services/menuService";
import { createMenuItem } from "../services/menuItemService";
import { fetchRelatedPages } from "../services/pageService";

const MenuItemForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [order, setOrder] = useState(0);
  const [menuId, setMenuId] = useState(null);
  const [pageId, setPageId] = useState(null);
  const [menus, setMenus] = useState([]);
  const [pages, setPages] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const loadMenus = async () => {
      try {
        const menusData = await fetchMenus();
        setMenus(
          menusData.map((menu) => ({ value: menu._id, label: menu.title }))
        );
      } catch (err) {
        console.error("Failed to fetch menus", err);
      }
    };

    const loadPages = async () => {
      try {
        const pagesData = await fetchRelatedPages();
        setPages(
          pagesData.map((page) => ({ value: page._id, label: page.title }))
        );
      } catch (err) {
        console.error("Failed to fetch pages", err);
      }
    };

    loadMenus();
    loadPages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("User is not authenticated");
      return;
    }

    const menuItemData = {
      page_id: pageId ? pageId.value : null,
      order,
      title,
      link,
      created_by: user._id,
    };

    try {
      await createMenuItem(menuId.value, menuItemData);
      setSuccess("Menu item created successfully");
      setError(null);
      setTitle("");
      setLink("");
      setOrder(0);
      setMenuId(null);
      setPageId(null);
    } catch (err) {
      setSuccess(null);
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("Failed to create menu item");
      }
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-10 rounded shadow-md mb-4">
      <h2 className="text-2xl font-bold mb-6">Create a New Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="link" className="block text-gray-700">
            Link
          </label>
          <input
            type="text"
            id="link"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="order" className="block text-gray-700">
            Order
          </label>
          <input
            type="number"
            id="order"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={order}
            onChange={(e) => setOrder(parseInt(e.target.value, 10))}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="menuId" className="block text-gray-700">
            Menu
          </label>
          <Select
            id="menuId"
            value={menuId}
            onChange={setMenuId}
            options={menus}
            className="mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pageId" className="block text-gray-700">
            Page
          </label>
          <Select
            id="pageId"
            value={pageId}
            onChange={setPageId}
            options={pages}
            className="mt-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Menu Item
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </form>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 mt-4"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default MenuItemForm;
