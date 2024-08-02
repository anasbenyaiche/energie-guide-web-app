import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login as authLogin } from "../services/authService";
import logo from '../assets/logo.svg';
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated, login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      await authLogin(username, password, login);
      setIsAuthenticated(true);
      navigate("/admin/pages/create");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-bgadmin-gradient px-4 lg:px-0 sm:px-0 ">
      <div className=" mb-8  text-center  max-w-md">
        <img src={logo} alt="energie guide" className=" mx-auto" />
        <div className=" mt-4">
          <p className=" text-sm text-white">République Tunisienne</p>
          <h2 className=" text-xl text-white">MINISTÈRE DE L'INDUSTRIE, DES MINES ET DE L’ÉNERGIE</h2>
        </div>
      </div>
      <div className="shadow-lg rounded-md overflow-hidden bg-white w-full max-w-md mx-4 px-5 py-8">
        <div className="py-4">
          <h2 className="text-2xl font-medium text-center text-primary-title mb-8">
            Se connecter à l'espace administrateur
          </h2>
          <div className="flex flex-col px-3">
            <div className=" mb-4 ">
              <label htmlFor="name" className=" font-semibold"> Nom d'utilsateur </label>
              <input
                type="text"
                placeholder="Votre nom d'utilsateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-md w-full border mt-2 bg-[#e8f0fe] border-gray-300 px-3 py-3 focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
            </div>
            <div className=" mb-4">
              <label className=" font-semibold" htmlFor="password"> Mot de passe </label>
              <input
                type="password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md w-full border mt-2 bg-[#e8f0fe] border-gray-300 px-3 py-3 focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
            </div>
            <div className=" inline-block text-center mt-5 ">
              <button
                onClick={handleLogin}
                className="bg-bg-btn px-2 border-[1px] w-full py-4 hover:text-[#011A48] hover:bg-white hover:border-[1px]	 hover:border-[#011A48] text-white font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-200"
              >
                Me connecter
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
