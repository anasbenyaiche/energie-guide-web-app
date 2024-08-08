import { useState, useEffect } from "react";
import "./SideBarMenu.css";
import SideBarMenuItem from "./SideBarMenuItem";
import SideBarMenuTitle from "./SideBarMenuTitle";
import { getQueryMenu } from "../../services/menuService";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";


const SideBarMenu = () => {
  const [sideBarMenu, setSideBarMenu] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchSideBarMenu = async () => {
      try {
        const response = await getQueryMenu("placement=sidebar");
        setSideBarMenu(response);
      } catch (err) {
        console.error("Failed to fetch nav menu items", err);
      }
    };

    fetchSideBarMenu();
  }, []);

  const handleAddPage = () => {
    navigate("/admin/pages/create");
  };
  const handleListPage = () => {
    navigate("/admin/pages")
  }

  const handlePageContent = (id) => {
    navigate(`/admin/${id}/blocks`);
  };
  const handleAdminMenu = () => {
    navigate(`/admin/menu-item/create`);
  };

  return (
    <div className="">
      <SideBarMenuTitle
        title={sideBarMenu?.menu?.title}
        subtitle={sideBarMenu?.menu?.subtitle}
      />
      <div className="bg-[#3C3A3A] p-2 text-white font-normal">
        <button onClick={handleAddPage}>Créer une nouvelle page </button>
      </div>


      <div className=" p-2">
        <div className="bg-[#3C3A3A] mb-2 p-2 flex text-white justify-between  items-center font-normal">
          <p>Liste des pages
          </p>
          <button onClick={handleListPage}>
            <FaRegEdit />
          </button>
        </div>
        <div className="line"></div>
        <ul className=" mt-2 p-0">
          {sideBarMenu?.menuItems?.map((menuItem) => (
            <div key={menuItem._id}>
              <SideBarMenuItem item={menuItem} editPage={() => handlePageContent(menuItem.page_id)} />
            </div>
          ))}
        </ul>
      </div>
      <div className="line"></div>
      <div className="border border-white p-2 flex items-center justify-between">
        <p className=" font-medium text-lg text-white">Ajouter un élément au menu</p>
        <button onClick={handleAdminMenu}>
          <FaRegEdit className=" text-white text-md" />
        </button>
      </div>
    </div>
  );
};

export default SideBarMenu;
