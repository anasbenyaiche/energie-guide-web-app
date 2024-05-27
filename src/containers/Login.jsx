import { useContext, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext); // Access setIsAuthenticated

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token); // Store token in local storage

      setIsAuthenticated(true); // Update authentication state in AuthContext

      navigate("/admin/dashboard"); // Redirect on successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-500">
      <div className="shadow-lg rounded-3xl overflow-hidden bg-white w-full md:w-1/2 p-8">
        <h2 className="text-2xl font-medium mb-4 text-center text-indigo-700">
          Admin panel
        </h2>
        <div className="flex flex-col space-y-2 items-center">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col m-2 space-y-2 items-center">
          <button
            onClick={handleLogin}
            className="bg-blue-500 w-100 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
