import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

/**
 * Log in the user and store the authentication token.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @param {function} login - Function to set the user and token in the context.
 * @returns {Promise<Object>} - User data if login is successful.
 * @throws {Error} - If the login fails.
 */
export const login = async (username, password, login) => {
  try {
    const response = await api.post("/auth/login", {
      username,
      password,
    });
    const { token, user } = response.data;

    // Store token and user in local storage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Set the user and token in the context
    login(token, user);

    return user;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

/**
 * Log out the user by removing the authentication token.
 */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

/**
 * Get the authentication token from local storage.
 * @returns {string|null} - The authentication token if available.
 */
export const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Get the user data from local storage.
 * @returns {Object|null} - The user data if available.
 */
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
