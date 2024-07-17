import React from 'react'
import bascon from '../../assets/icon/bascon.png';
import proc from '../../assets/icon/proc.png';
import folder from '../../assets/icon/folder.png';
import folderbl from '../../assets/icon/folderbl.png';
import procbl from '../../assets/icon/procbl.png';
import basconbl from '../../assets/icon/basconbl.png';
import { Link } from 'react-router-dom';
const Cards = [
    {
        icon: bascon,
        title: "Base de connaissances",
        text: "20 Articles / 7 Catégories",
        iconbl: basconbl,
        url: 'base_de_connaissance'
    },
    {
        icon: proc,
        title: "Procédure",
        text: "20 Articles / 7 Catégories",
        iconbl: procbl,
        url: 'procedure'
    },
    {
        icon: folder,
        title: "Documents",
        text: "20 Articles / 7 Catégories",
        iconbl: folderbl,
        url: 'document'
    }
]


const IconCards = () => {
    return (
        <div className='backicon w-full p-10'>
            <div className=' row mx-auto'>
                <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-3">
                    {Cards.map((card, index) => (
                        <div key={index} className=' border-2 border-white py-8 px-4 cardarticle'>
                            <Link to={card.url}>
                                <div className=' flex items-center gap-3'>
                                    <img className='icon' src={card.icon} alt={card.title} />
                                    <img className='iconbl hidden' src={card.iconbl} alt={card.title} />
                                    <div>
                                        <h3 className=' text-xl text-white font-bold'>  {card.title}</h3>
                                        <p className='text-white text-sm'>
                                            {card.text}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default IconCards
