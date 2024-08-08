import React from 'react'
import "./footere.css";
import logoFooter from '../../assets/logo-bottom.png'
const FooterE = () => {
    return (
        <div className="bg-[#04162E] text-white py-10">
            <div className='row'>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto">
                    <div className='col-span-1 flex items-start space-x-4'>
                        <div className="">
                            <img
                                src={logoFooter}
                                alt="MINISTÈRE DE L'INDUSTRIE, DES MINES ET DE L’ÉNERGIE"
                                width="200"
                                height="100"
                                className=' max-w-[70px]'
                            />
                            <div>
                            </div>
                        </div>
                        <h3 className="font-bold text-[0.8em] mt-4">MINISTÈRE DE L'INDUSTRIE, DES MINES ET DE L’ÉNERGIE</h3>
                    </div>

                    <div className="col-span-1 text-[#5d728b]">
                        <h4 className="font-bold  text-xl">Ministère</h4>
                        <ul className="mt-2 space-y-1 text-sm p-0 list-none">
                            <li>Mot de Bienvenue</li>
                            <li>Visions & Missions</li>
                            <li>Attributions</li>
                            <li>Organigramme</li>
                        </ul>
                    </div>
                    <div className="col-span-1 text-[#5d728b]">
                        <ul className="mt-2 space-y-1 text-sm list-none p-0">
                            <li>Entreprises et Établissements sous tutelle</li>
                            <li>Budget du Ministère</li>
                            <li>Coopération internationale</li>
                            <li>Cadre réglementaire</li>
                            <li>Open Data</li>
                        </ul>
                    </div>
                    <div className="col-span-1 mt-4">
                        <h4 className="text-3xl uppercase  font-thin">SUIVEZ<span className=" font-medium">-nous</span></h4>
                        <div className="flex space-x-4 mt-2 footer-4">
                            <ul>
                                <li>
                                    <a
                                        href="https://www.facebook.com/MinistereIEM/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fa fa-facebook" aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="fa fa-twitter" aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        <i className="fa fa-youtube" aria-hidden="true"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto -mt-2'>
                    <div className='grid grid-cols-1 text-[13px] font-semibold pt-5'>
                        <p className="bodytext">
                            Immeuble Panorama, 40 avenue du Japon, Montplaisir, Tunis 1002 -
                            Tunisie.
                        </p>
                        <p className="bodytext">Téléphone : (+216) 71 901 953</p>
                        <p className="bodytext">Fax : (+216) 71 909 149</p>
                        <p className="bodytext">
                            E-mail :{" "}
                            <a className='text-[#5d728b] hover:text-[#DC1D12]' href="mailto:contact@energiemines.gov.tn">
                                contact(at)energiemines.gov.tn
                            </a>
                        </p>
                    </div>
                </div>

                <div className=' flex items-center text-xs justify-between px-1 border-t border-gray-700 mt-4 pt-2 '>

                    <div className=" text-center">
                        2020© Ministère de l'Industrie, des Mines et de l’Énergie.
                    </div>
                    <div className="text-center text-[#5d728b]">
                        <a href="#" className="mx-1 hover:text-[#DC1D12]">Liens utiles</a>
                        <a href="#" className="mx-1 hover:text-[#DC1D12]">Publications</a>
                        <a href="#" className="mx-1 hover:text-[#DC1D12]">Dénoncer une corruption</a>
                        <a href="#" className="mx-1 hover:text-[#DC1D12]">Accès à l’information</a>
                        <a href="#" className="mx-1 hover:text-[#DC1D12]">Plan du site</a>
                        <a href="#" className="mx-1 hover:text-[#DC1D12]">Contact</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FooterE
