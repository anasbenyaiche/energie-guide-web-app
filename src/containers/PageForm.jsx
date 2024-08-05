import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createPage } from "../services/pageService"; // Import the createPage function

const PageForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("User is not authenticated");
      return;
    }

    const pageData = {
      title,
      slug,
      created_by: user._id,
    };

    try {
      await createPage(pageData); // Use createPage from pageService
      setSuccess("Page created successfully");
      setError(null);
      setTitle("");
      setSlug("");
    } catch (err) {
      setSuccess(null);
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("Failed to create page");
      }
    }
  };

  return (
    <div className=" max-w-3xl mx-auto mt-4">
      <h2 className="text-5xl font-medium text-primary-title">Create a New Page</h2>
      <div className="bg-white shadow-lg  mt-3 mb-5 py-4 px-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium text-black">
              Titre de page
            </label>
            <input
              type="text"
              placeholder="Titre de la nouvelle page"
              id="title"
              className="rounded-md w-full border mt-2 bg-[#e8f0fe] border-gray-300 px-3 py-3 focus:outline-none focus:ring-1 focus:ring-gray-200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="slug" className="block font-medium text-black">
              Slug
            </label>
            <input
              type="text"
              placeholder="Slug de la nouvelle page"
              id="slug"
              className="rounded-md w-full border mt-2 bg-[#e8f0fe] border-gray-300 px-3 py-3 focus:outline-none focus:ring-1 focus:ring-gray-200"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>
          <div className=" flex items-center pt-4 gap-4 justify-end">
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">{success}</p>}
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
              Créer la page
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default PageForm;
