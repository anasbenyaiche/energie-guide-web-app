import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { FaPlus } from "react-icons/fa";

const PagesList = () => {
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await api.get("/pages");
        setPages(response.data);
      } catch (err) {
        console.error("Failed to fetch pages", err);
      }
    };

    fetchPages();
  }, []);

  const handlePageClick = (id) => {
    navigate(`/admin/edit-page/${id}`);
  };

  const handleDeletePage = async (id) => {
    try {
      await api.delete(`/pages/${id}`);

      setPages(pages.filter((page) => page._id !== id));
    } catch (err) {
      console.error("Failed to delete page", err);
    }
  };

  const handleAddPage = () => {
    navigate("/admin/pages/create");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Pages List</h2>
        <button
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleAddPage}
        >
          <FaPlus className="mr-2" /> Add Page
        </button>
      </div>
      <ul className="grid grid-cols-1 gap-4">
        {pages.map((page) => (
          <li
            key={page._id}
            className="flex items-center justify-between bg-gray-100 p-2 rounded shadow hover:bg-gray-200"
          >
            <span
              className="cursor-pointer text-blue-600 hover:underline "
              onClick={() => handlePageClick(page._id)}
            >
              {page.title}
            </span>
            <div className="flex space-x-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                onClick={() => handlePageClick(page._id)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                onClick={() => handleDeletePage(page._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PagesList;
