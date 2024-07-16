import React from "react";
import "./Searchbar.css";
import Loop from "./Loop";

const Searchbar = () => {
  return (
    <div className="searchbar-container flex flex-col justify-center align-center items-center gap-2">
      <h1 className="text-white text-4xl w-1/2 text-center">
        Votre Guide des Projets d'Énergie Renouvelable en Tunisie
      </h1>
      <h2 className="text-white text-gray-400">
        Règlements et procédures de développement de projets d'énergies
        renouvelables
      </h2>
      <div className="m-2 w-full text-center">
        <div className="relative w-1/2 mx-auto">
          <Loop classname="searchbar-icon" />
          <input
            className="searchbar-field w-full p-3 pl-10"
            placeholder="Rechercher des règlements ou procédures.."
          />
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
