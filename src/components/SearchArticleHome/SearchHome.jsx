import React from 'react'

const SearchHome = () => {
    return (
        <div className=' bg-[#0D335F] py-8 text-center'>
            <div className='container mx-auto'>
                <h1 className=' text-white font-bold text-2xl mb-4'> Votre Guide des Projets <br />
                    d'Énergie Renouvelable en Tunisie </h1>
                <p className='  text-white opacity-60 text-sm mb-4 '> Règlements et procédures de développement de projets d'énergies renouvelables </p>
                <div className="bg-white border-2 p-2 relative flex md:w-3/4 lg:w-3/5 mx-auto">
                    <span className="w-auto flex justify-end  items-center text-[#555555] p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </span>
                    <input name="episodequery" id="title" className="bg-white border-[#999999] text-[#555555] outline-none border-0 w-full p-2" type="text"
                        placeholder="Rechercher de question ou mot clés" />
                </div>
            </div>
        </div>
    )
}

export default SearchHome
