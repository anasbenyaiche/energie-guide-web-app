import React from 'react'
import { GoArrowRight } from "react-icons/go";

const TabButtons = ({ tabData, setActivetab, activeTab }) => {
    return (
        <div className=' bg-[#DDDDDD] flex text-center justify-center items-center gap-16 pt-6'>
            {tabData.map((item, index) => (
                <div>
                    <button className={`bg-none bg-transparent text-[#111111] focus:outline-none
            inline-block p-2  rounded-t-lg pb-3 hover:border-lighter
            ${index === activeTab ? 'text-[#FF0015] font-semibold border-b-2 border-[#FF0015]' : ''}`}
                        key={item.title} onClick={() => setActivetab(index)}>

                        <div className='mx-auto text-center mb-4 w-24'> {index === activeTab ? (
                            <div className='border rounded-full bg-[#FF0015] p-7'>
                                <img className='' src={item.icontab} alt={item.title} />
                            </div>

                        )
                            : (
                                <div className='border-[#999999] border rounded-full p-7'>
                                    <img className='' src={item.icon} alt={item.title} />
                                </div>
                            )
                        }
                        </div>



                        <p className={` ${index === activeTab ? 'text-[#FF0015]' : ''} font-bold`}>{item.title}

                        </p>
                    </button>
                </div>
            ))}

        </div>
    )
}

export default TabButtons
