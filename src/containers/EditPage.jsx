import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

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
        const response = await api.get(`/pages/${id}`);
        console.log(response);
        setTitle(response.data.page.title);
        setSlug(response.data.page.slug);
      } catch (err) {
        console.error("Failed to fetch page", err);
      }
    };

    fetchPage();
  }, [id]);
  console.log(title, slug);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/pages/${id}`, { title, slug });
      setSuccess("Page updated successfully");
      setError(null);
      console.log("Page updated:", response.data);
    } catch (err) {
      setSuccess(null);
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("Failed to update page");
      }
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-10 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Page</h2>
      <form onSubmit={handleUpdate}>
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Page
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

export default EditPage;
