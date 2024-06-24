import React from 'react'
import menu from '../../utils/menuContent'

const MenuContent = ({ handelBlockClick }) => {
    return (
        <div className=' shadow-md flex p-4 items-center justify-start gap-6'>
            {menu.map((item) => (
                <div key={item.title} className=" text-center cursor-pointer"
                    onClick={() => handelBlockClick(`${item.title.toLocaleLowerCase()}`)}
                >
                    {item.icone}
                    {item.title}
                </div>
            ))}
        </div>

    )
}

export default MenuContent
