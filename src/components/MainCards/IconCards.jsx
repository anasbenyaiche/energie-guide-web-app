import React from 'react'
import bascon from '../../assets/icon/bascon.png';
import proc from '../../assets/icon/proc.png';
import folder from '../../assets/icon/folder.png';
import folderbl from '../../assets/icon/folderbl.png';
import procbl from '../../assets/icon/procbl.png';
import basconbl from '../../assets/icon/basconbl.png';
const Cards = [
    {
        icon: bascon,
        title: "Base de connaissances",
        text: "20 Articles / 7 Catégories",
        iconbl: basconbl
    },
    {
        icon: proc,
        title: "Procédure",
        text: "20 Articles / 7 Catégories",
        iconbl: procbl,
    },
    {
        icon: folder,
        title: "Documents",
        text: "20 Articles / 7 Catégories",
        iconbl: folderbl
    }
]


const IconCards = () => {
    return (
        <div className='backicon w-full p-10'>
            <div class="grid grid-cols-3 gap-4">
                {Cards.map((card, index) => (
                    <div key={index} className=' border-2 border-white py-8 px-4 cardarticle'>
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

                    </div>
                ))}
            </div>
        </div>
    )
}

export default IconCards
