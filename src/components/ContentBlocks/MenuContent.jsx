import React from 'react'
import menu from '../../utils/menuContent'

const MenuContent = ({ handelBlockClick }) => {
    return (
        <div className=' shadow-lg border  flex p-6 items-center rounded-md justify-center gap-8'>
            {menu.map((item) => (
                <div key={item.title} className="flex flex-col items-center cursor-pointer"
                    onClick={() => handelBlockClick(`${item.title.toLocaleLowerCase()}`)}>
                    <img src={item.icone} alt={item.title} className='mb-1' />  {item.label}
                </div>
            ))}
        </div>

    )
}

export default MenuContent
