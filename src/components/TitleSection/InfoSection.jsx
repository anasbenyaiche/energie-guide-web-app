import React from 'react'
import { IoArrowForwardCircleSharp } from "react-icons/io5";

const InfoSection = () => {
    return (
        <div className="container font-semibold">
            <div className="mb-8">
                <p className="mb-4">
                    Toute collectivité locale et tout établissement public ou privé, raccordé au réseau électrique national en Moyenne Tension ou Haute Tension (MT/HT) et opérant dans les secteurs de l'industrie, de l'agriculture ou du tertiaire peut décider de produire sa propre électricité à partir des énergies renouvelables. On parle alors de projet d'autoconsommation.
                </p>
                <p className="mb-4">
                    Ces projets d'autoconsommation peuvent être des projets solaires ou éoliens. Dans la suite du guide, les différences dans les procédures entre ces deux technologies sont explicitées, si elles existent.
                </p>
                <p className="mb-4">
                    Les projets d'autoconsommation permettent de consommer sa propre électricité instantanément, et ainsi réaliser des économies sur ses factures. Mais également de revendre les excédents de sa production d'électricité à la STEG qui s'engage à les acheter dans le cadre d'un contrat conclu entre les deux parties (dans la limite des 30% de la production annuelle de l'installation). L'autoconsommateur est donc aussi autoproducer.
                </p>
                <p className="mb-4">
                    On distingue deux configurations :
                </p>
                <ol className="list-decimal list-inside mb-4">
                    <li className="mb-2">
                        Les projets sur site, sans transport d'électricité sur le réseau. Le lieu de production de l'électricité est aussi le lieu de consommation. Pour le solaire PV, cela peut concerner des projets sur toiture ou au sol par exemple.
                    </li>
                    <li className="mb-2">
                        Les projets sur site déporté, avec transport d'électricité sur le réseau. En effet, les projets reliés au réseau MT/HT ont en général une capacité élevée ({'>'}40kW en général, mais ce n'est qu'une valeur indicative) nécessitant un espace important pour installer les équipements de production, ce qui n'est pas forcément possible sur le site de consommation. Il est alors nécessaire de transporter l'électricité produite sur le réseau.
                    </li>
                </ol>
                <p className="mb-4">
                    Quelle que soit la configuration du projet, il convient d'étudier la ressource disponible dans la zone d'implantation des installations (ressource solaire, mesure de vent), ainsi que d'évaluer le besoin en électricité autoconsommée pour dimensionner les équipements.
                </p>
            </div>

            <div className="flex items-center gap-2 mb-4">
                <div className='inline-block'>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md">Régimes</button>
                </div>
                <span className="ml-2"><IoArrowForwardCircleSharp className='text-blue-500 text-2xl' /></span>
                <button className="bg-blue-300 text-black py-2 px-4 rounded-md">Autoconsommation</button>
                <button className="bg-gray-300 text-gray-500 py-2 px-4 rounded-md">Autorisation</button>
                <button className="bg-gray-300 ext-gray-500 py-2 px-4 rounded-md">Concessions</button>
            </div>

            <div className="flex items-center gap-2 mb-4">
                <div className=' w-1/4 inline-block'>
                    <button className=" w-full  bg-blue-500 text-white py-2 px-4 rounded-md flex items-center justify-center">
                        <span>Technologies</span>
                    </button>
                </div>
                <span className="ml-2"><IoArrowForwardCircleSharp className='text-blue-500 text-2xl' /></span>
                <div className=' w-3/4'>
                    <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md">Solaire PV ou Eolien</button>
                </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
                <div className=' w-1/4 inline-block'>
                    <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md flex items-center justify-center">
                        <span>Type de projets</span>
                    </button>
                </div>
                <span className="ml-2"><IoArrowForwardCircleSharp className='text-blue-500 text-2xl' /></span>
                <div className='w-3/4'>
                    <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md">Connectés aux réseaux MT/HT</button>
                </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
                <div className=' w-1/4 inline-block'>
                    <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md flex items-center justify-center">
                        <span>Technologies</span>
                    </button>
                </div>
                <span className="ml-2"><IoArrowForwardCircleSharp className='text-blue-500 text-2xl' /></span>
                <div className='w-3/4'>
                    <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md">Solaire PV ou Eolien</button>
                </div>
            </div>
        </div>
    );
};

export default InfoSection
