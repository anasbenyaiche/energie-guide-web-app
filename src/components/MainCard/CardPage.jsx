import React from 'react'
import { MdOutlineArrowForwardIos } from "react-icons/md";
import './CardStyle.css';
import { Link } from 'react-router-dom';
const CardPage = ({ number, title, text, image, url, hovredimg }) => {
    return (
        <div className="newsCard card relative news-Slide-up">
            <img className='first_pic' src={image} alt={title} />
            <img className=' second_pic' src={hovredimg} alt={title} />
            <div className="card-number">{number}</div>
            <div className='newsCaption'>
                <div className='flex justify-between items-center'>
                    <Link to={url} >
                        <h2 class=' text-2xl font-medium pb-5 pt-1'>{title}</h2>
                    </Link>
                    <MdOutlineArrowForwardIos className='explore-icon ' />
                </div>
                <div className='newsCaption-content'>
                    <p className=' text-sm text-white pb-4'>{text}</p>
                </div>
                <div className='inline-flex items-center gap-3'>
                    <Link to={url} className='bg-none border-none bg-transparent p-0  text-[#008AEE] focus:outline-none'> Explorer plus </Link>
                    {/* <hr class=" w-14 h-1 bg-[#008AEE]" /> */}
                </div>
            </div>
        </div>
    );
}

export default CardPage
