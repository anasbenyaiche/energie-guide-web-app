import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { deletePage, getPages } from "../services/pageService";

const PagesList = () => {
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const pagesData = await getPages();
        setPages(pagesData);
      } catch (err) {
        console.error("Failed to fetch pages", err);
      }
    };

    fetchPages();
  }, []);

  // navigating to edit page
  const handlePageClick = (id) => {
    navigate(`/admin/edit-page/${id}`);
  };
  // Navigation to content blocks
  const handlePageContent = (id) => {
    navigate(`/admin/${id}/blocks`);
  };
  // Delete page from the delete button
  const handleDeletePage = async (id) => {
    try {
      await deletePage(id);
      setPages(pages.filter((page) => page._id !== id));
    } catch (err) {
      console.error("Failed to delete page", err);
    }
  };

  const handleAddPage = () => {
    navigate("/admin/pages/create");
  };

  return (
    <div className=" max-w-3xl mx-auto mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-5xl font-medium text-primary-title">Liste des pages</h2>
        <button
          className="flex items-center bg-bg-btn shadow-md text-white px-4 py-2"
          onClick={handleAddPage}
        >
          <FaPlus className="mr-2" /> Add Page
        </button>
      </div>
      <div className=" bg-white shadow-lg  mt-3 mb-5 py-4 px-6">
        <ul className="grid grid-cols-1 gap-4">
          {pages.map((page) => (
            <li
              key={page._id}
              className="flex items-center justify-between bg-white p-2 rounded shadow-lg"
            >
              <div
                className="cursor-pointer flex items-center text-secondary-title font-medium text-lg"
                onClick={() => handlePageContent(page._id)}
              >
                <IoMdArrowDropright />
                {page.title}
              </div>
              <div className="flex space-x-2">
                <button
                  className=" bg-bg-btn text-white text-sm p-2 rounded"
                  onClick={() => handlePageClick(page._id)}
                >
                  Mettre à jour
                </button>
                <button
                  className="bg-red-500 text-white p-2 text-sm  rounded"
                  onClick={() => handleDeletePage(page._id)}
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

export default PagesList;
