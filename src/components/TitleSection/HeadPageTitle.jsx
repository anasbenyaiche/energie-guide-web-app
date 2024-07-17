import React, { useState } from 'react'
import PropTypes from 'prop-types'
import InfoSection from './InfoSection'


const HeadPageTitle = ({ title, subTitle }) => {
    const [openDetails, setOpenDetails] = useState(false)
    return (
        <div className='bg-[#F0F0F0] text-black py-12 '>
            <div className=' row'>
                <div className='items-start flex justify-between gap-5'>
                    <div className=' flex-1'>
                        <h1 className=' text-black font-bold text-4xl'> {title}</h1>
                    </div>
                    <div className=' flex-1'>

                        <h3 className=' text-black text-lg font-bold mb-5'> {subTitle}</h3>
                        <div className='font-semibold'>
                            Les collectivités locales et les établissements publics ou privés peuvent produire leur propre électricité à partir d'énergies renouvelables. C'est ce qu'on appelle l'autoconsommation.
                        </div>
                        <div className={`${openDetails ? 'hidden' : 'block'}  inline-flex items-center mt-5 gap-3`}>
                            <button className={`bg-none border-none bg-transparent p-0  text-[#008AEE] focus:outline-none`}
                                onClick={() => setOpenDetails(!openDetails)}> Plus de détails </button> <hr class=" w-14 h-1 bg-[#008AEE]" />
                        </div>
                        {openDetails && (
                            <div className='mt-6 '>
                                <InfoSection />
                                <div className={`${openDetails ? 'block' : 'hidden'}  inline-flex items-center mt-5 gap-3`}>
                                    <button className={`bg-none border-none bg-transparent p-0  text-[#008AEE] focus:outline-none`}
                                        onClick={() => setOpenDetails(!openDetails)}> Moin de détails </button> <hr class=" w-14 h-1 bg-[#008AEE]" />
                                </div>
                            </div>

                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

HeadPageTitle.prototype = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default HeadPageTitle
