import React from 'react'
import { Link, NavLink } from 'react-router-dom'
const menu = [
    {
        title: 'accueil',
        url: '',
    },
    {
        title: 'Autoconsommation',
        url: 'autoconsommation'
    },
    {
        title: 'autorisations',
        url: 'autorisation'
    },
    {
        title: 'concessions',
        url: 'concession'
    },
]

const MenuPage = () => {
    return (
        <div className=' bg-[#0D335F] p-5'>
            <div className=' row'>
                <div className=' flex items-center justify-between'>
                    <div className=' flex items-center gap-5 font-medium capitalize'>
                        {menu.map((item) => (
                            <NavLink className={({ isActive }) => isActive ? "text-[#FF0015] bg-[#FF0015] bg-opacity-15 p-2" : 'text-white'} to={`/${item.url}`} key={item.title}>
                                {item.title}
                            </NavLink>
                        ))}
                    </div>
                    <div className=' w-1/4 block'>
                        <div className="bg-white border-2 w-full p-2 relative flex">
                            <span className="w-auto flex justify-end  items-center text-[#555555] p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </span>
                            <input name="episodequery" id="title" className="bg-white border-[#999999] text-[#555555] outline-none border-0 w-full p-2" type="text"
                                placeholder="Rechercher de question ou mot clés" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuPage
