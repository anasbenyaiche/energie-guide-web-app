import axios from "axios";

// eslint-disable-next-line no-undef
const baseURL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000/api"; // Default fallback URL

const api = axios.create({
  baseURL,
  headers: {
    // Add any default headers here (optional)
  },
});

export default api;
