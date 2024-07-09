import React from 'react'
import PropTypes from 'prop-types'
const HeadSubTitle = ({ title, subTitle, text, pic }) => {
    return (
        <div className='text-black py-12 items-start px-4 flex justify-between gap-5'>
            <div className=' w-3/5'>
                <h3 className=' text-black text-lg font-bold mb-5'> {subTitle}</h3>
                <h1 className=' text-black font-bold text-4xl'> {title}</h1>
                <div className='font-semibold'>
                    {text}
                </div>
            </div>
            <div className=' w-2/5'>
                <img src={pic} alt={title} />
            </div>
        </div>
    )
}
HeadSubTitle.prototype = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,

}

export default HeadSubTitle
