import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { getMenus } from "../services/menuService";
import { getMenuItembyId } from "../services/menuItemService";
import { fetchRelatedPages } from "../services/pageService";

const EditMenuItemForm = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState(null);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [order, setOrder] = useState(0);
  const [menuId, setMenuId] = useState(null);
  const [pageId, setPageId] = useState(null);
  const [menus, setMenus] = useState([]);
  const [pages, setPages] = useState([]);
  const [pageOptions, setPageOptions] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const loadMenus = async () => {
      try {
        const menusData = await getMenus();
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
        setPages(pagesData);
        setPageOptions(
          pagesData.map((page) => ({ value: page._id, label: page.title }))
        );
      } catch (err) {
        console.error("Failed to fetch pages", err);
      }
    };

    const loadMenuItem = async () => {
      try {
        await loadMenus(); // Ensure menus are loaded first
        await loadPages(); // Ensure pages are loaded first

        const menuItemData = await getMenuItembyId(id);
        const page = pages.find(({ _id }) => menuItemData.page_id === _id);
        const menu = menus.find(({ value }) => menuItemData.menu_id === value);

        setMenuItem(menuItemData);
        setTitle(menuItemData.title);
        setLink(menuItemData.link);
        setOrder(menuItemData.order);
        setPageId(page ? { value: page._id, label: page.title } : null);
        setMenuId(menu ? { value: menu.value, label: menu.label } : null);
      } catch (err) {
        console.error("Failed to fetch menu item", err);
      }
    };

    loadMenuItem();
  }, [id, menus, pages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("User is not authenticated");
      return;
    }

    const menuItemData = {
      page_id: pageId ? pageId.value : null,
      menuId: menuId ? menuId.value : null,
      order,
      title,
      link,
      created_by: user._id,
    };

    try {
      await udpateMenuItem(id, menuItemData);
      setSuccess("Menu item updated successfully");
      setError(null);
    } catch (err) {
      setSuccess(null);
      setError(err.response?.data?.message || "Failed to update menu item");
      console.error(err);
    }
  };

  const handleChangePage = (value) => {
    setPageId(value);
    setLink(pages.find(({ _id }) => value.value === _id)?.slug || "");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-10 rounded shadow-md mb-4">
      <h2 className="text-2xl font-bold mb-6">Edit a Menu Item</h2>
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
          <label htmlFor="menuId" className="block text-gray-700">
            Menu
          </label>
          <Select
            id="menuId"
            value={menuId || null}
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
            value={pageId || null}
            onChange={handleChangePage}
            options={pageOptions}
            className="mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="link" className="block text-gray-700">
            Link
          </label>
          <input
            type="text"
            id="link"
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={link}
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

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Menu Item
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

export default EditMenuItemForm;
