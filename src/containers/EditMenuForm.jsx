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
  const customStyles = {
    control: (provided) => ({
      ...provided,
      background: '#e8f0fe',
      display: 'flex',
      flexWrap: 'nowrap',
      width: '100%',
      padding: '8px',
      borderRaduis: '6px'
    }),
  };
  return (
    <div className=" max-w-3xl mx-auto mt-4 mb-4">
      <h2 className="text-5xl font-medium text-primary-title mb-8">Mettre à jour le Menu</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium text-black">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="rounded-md w-full border mt-2 bg-[#e8f0fe] border-gray-300 px-3 py-3 focus:outline-none focus:ring-1 focus:ring-gray-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="menuId" className="block font-medium text-black">
            Menu
          </label>
          <Select
            id="menuId"
            elect
            styles={customStyles}
            value={menuId || null}
            onChange={setMenuId}
            options={menus}
            className="mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="pageId" className="block font-medium text-black">
            Page
          </label>
          <Select
            id="pageId"
            styles={customStyles}
            value={pageId || null}
            onChange={handleChangePage}
            options={pageOptions}
            className="mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="link" className="block font-medium text-black">
            Link
          </label>
          <input
            type="text"
            id="link"
            readOnly
            className="rounded-md w-full border mt-2 bg-[#e8f0fe] border-gray-300 px-3 py-3 focus:outline-none focus:ring-1 focus:ring-gray-200"
            value={link}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="order" className="block font-medium text-black">
            Order
          </label>
          <input
            type="number"
            id="order"
            className="rounded-md w-full border mt-2 bg-[#e8f0fe] border-gray-300 px-3 py-3 focus:outline-none focus:ring-1 focus:ring-gray-200"
            value={order}
            onChange={(e) => setOrder(parseInt(e.target.value, 10))}
            required
          />
        </div>
        <div className=" flex justify-end gap-4">
          <button
            type="submit"
            className=" bg-bg-btn px-7 py-3 text-white"
          >
            Mettre à jour le Menu
          </button>
          <button
            className="bg-gray-500 px-7 py-3 text-white"
            onClick={() => navigate(-1)}
          >
            Retour
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
        </div >
      </form>

    </div>
  );
};

export default EditMenuItemForm;
