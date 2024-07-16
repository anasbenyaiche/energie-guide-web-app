import React from "react";
import logo from "../../assets/logo-bottom.png";
import background from "../../assets/backgroundfinal.jpg";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div
      className="navbar-main-container"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-white bg-opacity-70">
        <nav className="container mx-auto p-4">
          <div className="flex justify-around items-center h-full">
            <div className="flex p-4 nav-logo-container items-center ">
              <img src={logo} alt="Logo" className="h-16" />
              <div className="ml-2">
                <span className="nav-logo-title">République Tunnisienne</span>
                <br />
                <span className="nav-logo-minister">
                  MINISTÈRE DE L'INDUSTRIE, DES MINES ET DE L’ÉNERGIE
                </span>
              </div>
            </div>
            <div className="nav-menu-container w-2/3">
              <div className="flex justify-around space-x-4">
                <ul className="flex space-x-4">
                  <li>
                    <Link to="" className="text-white">
                      Accueil
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="text-white">
                      Ministère
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="text-white">
                      Cadre réglementaire
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="text-white">
                      Grands projets
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="text-white">
                      Open Gov
                    </Link>
                  </li>
                </ul>
                <div className="flex ml-auto space-x-4">
                  <img
                    src="src\assets/svg/globe.svg"
                    height={25}
                    width={25}
                    alt="globe"
                  />
                  <img
                    src="src\assets/svg/loop.svg"
                    height={25}
                    width={25}
                    alt="globe"
                  />
                </div>
              </div>

              <hr className="border-t-2 border-white-300 my-4" />
              <ul className="flex space-x-4 justify-end items-center">
                <li>
                  <Link to="" className="text-white flex align-middle">
                    ENERGIE <IoIosArrowDown className="self-center ml-1" />
                  </Link>
                </li>
                <li>
                  <Link to="" className="text-white flex align-middle">
                    MINES
                    <IoIosArrowDown className="self-center ml-1" />
                  </Link>
                </li>
                <li>
                  <Link to="" className="text-white flex align-middle ">
                    ENERGIES RENOUVELABLES
                    <IoIosArrowDown className="self-center ml-1" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
