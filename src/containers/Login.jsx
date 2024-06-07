import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login as authLogin } from "../services/authService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated, login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      // Use authService to handle login
      await authLogin(username, password, login);
      setIsAuthenticated(true);

      // Redirect on successful login
      navigate("/admin/dashboard");
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
