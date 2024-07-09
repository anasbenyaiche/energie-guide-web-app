import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CreateLink = ({ formLink, handelChange }) => {


    return (
        <div className=' w-4/5 mx-auto space-y-5 p-5 border rounded '>
            <div>
                <p className=' mb-2 text-black text-base'> Add Link</p>
                <input type='text' name='link' placeholder='Add your link here'
                    value={formLink.link} onChange={handelChange}
                    className='peer h-full w-full border-b border-blue-gray-200 text-black bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                />
            </div>
            <div>
                <p className=' mb-2 text-black text-base'>Add Title For link</p>
                <input type='text' name='title' placeholder='Add title for link'
                    value={formLink.title} onChange={handelChange}
                    className='peer h-full w-full border-b border-blue-gray-200 text-black bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50' />
            </div>
            {/* <div className=' mt-4'> <Link to={formLink.link}>{formLink.title}</Link> </div> */}
        </div>
    )
}

export default CreateLink
