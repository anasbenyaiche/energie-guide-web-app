import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPageById, updatePageById } from "../services/pageService";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const page = await fetchPageById(id);
        setTitle(page.title);
        setSlug(page.slug);
      } catch (err) {
        console.error("Failed to fetch page", err);
      }
    };

    fetchPage();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updatePageById(id, { title, slug });
      setSuccess("Page updated successfully");
      setError(null);
    } catch (err) {
      setSuccess(null);
      setError(err.response?.data?.message || "Failed to update page");
      console.error("Failed to update page", err);
    }
  };

  return (
    <div className=" max-w-3xl mx-auto mt-4">
      <h2 className="text-5xl font-medium text-primary-title mb-5">
        Edit Page
      </h2>
      <form
        onSubmit={handleUpdate}
        className="bg-white shadow-lg  mt-3 mb-5 py-4 px-6"
      >
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
          <label htmlFor="slug" className="block text-gray-700">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>
        <div className=" flex justify-end items-center gap-4">
          <button
            className="bg-gray-500 text-white px-7 py-3"
            onClick={() => navigate(-1)}
          >
            Retour
          </button>
          <button type="submit" className=" bg-bg-btn px-7 py-3 text-white">
            Mettre à jour
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
        </div>
      </form>
    </div>
  );
};

export default EditPage;
