import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { getMenus } from "../services/menuService";
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
  const handleChangePage = (value) => {
    setPageId(value);
    setLink(pages?.find(({ _id }) => value.value === _id)?.slug);
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
    <div className=" max-w-3xl mx-auto mt-4">
      <h2 className="text-5xl font-medium text-primary-title">Ajouter un élément au menu</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg  mt-3 mb-5 py-4 px-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Titre de menu
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
          <label htmlFor="menuId" className="block text-gray-700">
            Préciser le type de menu
          </label>
          <Select
            styles={customStyles}
            id="menuId"
            value={menuId}
            onChange={setMenuId}
            options={menus}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pageId" className="block text-gray-700">
            Préciser la page
          </label>
          <Select
            id="pageId"
            styles={customStyles}
            name=""
            value={pageId}
            onChange={handleChangePage}
            options={pageOptions}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="link" className="block text-gray-700">
            Ajouter un lien
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
        {pageId && (
          <div className="mb-4">
            <label htmlFor="order" className="block text-gray-700">
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
        )}
        <div className=" flex justify-end items-center gap-4">
          <button
            className="bg-gray-500 px-7 py-3 text-white"
            onClick={() => navigate(-1)}
          >
            Retour
          </button>
          <button
            type="submit"
            className=" bg-bg-btn px-7 py-3 text-white"
          >
            Ajouter le menu
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
        </div>

      </form>

    </div>
  );
};

export default MenuItemForm;
