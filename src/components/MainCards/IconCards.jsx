import React from 'react'
import bascon from '../../assets/icon/bascon.png';
import proc from '../../assets/icon/proc.png'
import folder from '../../assets/icon/folder.png'

const Cards = [
    {
        icon: bascon,
        title: "Base de connaissances",
        text: "20 Articles / 7 Catégories"
    },
    {
        icon: proc,
        title: "Procédure",
        text: "20 Articles / 7 Catégories"
    },
    {
        icon: folder,
        title: "Documents",
        text: "20 Articles / 7 Catégories"
    }
]


const IconCards = () => {
    return (
        <div className='backicon w-full p-10'>
            <div class="grid grid-cols-3 gap-4">
                {Cards.map((card, index) => (
                    <div key={index} className=' border-2 border-white py-8 px-4'>
                        <div className=' flex items-center gap-3'>
                            <img src={card.icon} alt={card.title} />
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
