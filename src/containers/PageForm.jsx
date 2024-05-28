import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";

const PageForm = () => {
  const { user } = useContext(AuthContext);
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
    console.log(pageData);

    try {
      const response = await api.post("/pages", pageData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSuccess("Page created successfully");
      setError(null);
      console.log("Page created:", response.data);
    } catch (err) {
      setSuccess(null);
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("Failed to create page");
      }
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-10 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create a New Page</h2>
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
          Create Page
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </form>
    </div>
  );
};

export default PageForm;
