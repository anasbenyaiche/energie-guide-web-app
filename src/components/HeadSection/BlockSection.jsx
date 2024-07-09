import React from 'react'
import PropTypes from 'prop-types'
const BlockSection = ({ title, article, category, picture, description }) => {

    return (
        <div className=' container mx-auto px-8'>
            <img src={picture} alt="" />
            <div className=' mt-10 flex items-center justify-between'>
                <div className='flex-1'>
                    <h2 className='text-black text-4xl font-bold'>
                        {title}
                    </h2>
                    <div className='flex items-center justify-start gap-5 mt-10'>
                        <p className=' text-black font-bold border-b-2 border-[#0D99FF] text-2xl '>
                            {article}
                        </p>
                        <p className=' text-black font-bold  border-b-2 border-[#0D99FF] text-2xl '>
                            {category}
                        </p>
                    </div>
                </div>
                <p className=' flex-1 text-sm text-black font-light'>
                    {description}
                </p>
            </div>
            <div className=' text-black flex justify-between mt-5'>
                <div></div>
                <div className=' w-1/2 block'>
                    <div className="bg-white border-2 w-full p-2 relative flex">
                        <span className="w-auto flex justify-end  items-center text-[#555555] p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </span>
                        <input name="episodequery" id="title" className="bg-white border-[#999999] text-[#555555] outline-none border-0 w-full p-2" type="text"
                            placeholder="Rechercher dans base de connaissances" />
                    </div>
                </div>

            </div>
        </div>
    )
}

BlockSection.protoTypes = {
    title: PropTypes.string.isRequired,
    article: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default BlockSection
