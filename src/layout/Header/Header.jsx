import React from "react";
import { Link } from "react-router-dom";
import world from "../../assets/icon/world.svg";
import search from "../../assets/icon/search.svg";
import logo from "../../assets/logo.svg";
const Header = () => {
  return (
    <div className=" row py-12">
      <div className=" grid grid-cols-4">
        <div className="">
          <div className=" flex items-center justify-start gap-4">
            <div className="">
              <Link to="/">
                <img className="" src={logo} alt="energie guide" />
              </Link>
            </div>
            <div className=" w-3/5">
              <div className="text-xs text-[#333333] font-medium">
                République Tunisienne
              </div>
              <div className=" text-[#04162E] font-bold">
                MINISTÈRE DE L'INDUSTRIE, DES MINES ET DE L’ÉNERGIE
              </div>
            </div>
          </div>
        </div>
        <div className=" col-span-3">
          <div className=" flex justify-between items-center  border-b border-white text-white pb-3">
            <div className=" flex items-center  gap-5 text-base">
              <Link to="/" className="  hover:text-[#DC1D12]">
                Accueil
              </Link>
              <Link
                to="https://www.energiemines.gov.tn/fr/ministere/"
                className="  hover:text-[#DC1D12]"
              >
                Ministère
              </Link>
              <Link
                to="https://www.energiemines.gov.tn/fr/cadre-reglementaire/"
                className="  hover:text-[#DC1D12]"
              >
                Cadre réglementaire
              </Link>
              <Link
                to="https://www.energiemines.gov.tn/fr/grands-projets/"
                className="  hover:text-[#DC1D12]"
              >
                Grands projets
              </Link>
              <Link
                to="https://www.energiemines.gov.tn/fr/open-gov/"
                className="  hover:text-[#DC1D12]"
              >
                Open Gov
              </Link>
            </div>
            <div className=" flex items-center gap-2">
              <img src={world} alt="world energie" />
              <img src={search} alt="search" />
            </div>
          </div>
          <div className=" flex justify-end text-white">
            <div className=" text-base font-bold flex items-center gap-5 uppercase">
              <Link to="https://www.energiemines.gov.tn/fr/themes/energie/">
                ENERGIE
              </Link>
              <Link to="https://www.energiemines.gov.tn/fr/themes/mines/">
                MINES
              </Link>
              <Link to="https://www.energiemines.gov.tn/fr/themes/energies-renouvelables/">
                ENERGIES RENOUVELABLES{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
