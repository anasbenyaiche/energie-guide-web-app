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
const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await api.post("/refresh-token", {
    refreshToken,
  });
  const { accessToken } = response.data;
  localStorage.setItem("token", accessToken);
  return accessToken;
};

// Axios request interceptor
api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Axios response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api;
