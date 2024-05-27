import axios from "axios";

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"; // Default fallback URL

const api = axios.create({
  baseURL,
  headers: {
    // Add any default headers here (optional)
  },
});

export default api;
