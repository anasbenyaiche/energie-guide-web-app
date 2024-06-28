import React from 'react'
import { MdOutlineArrowForwardIos } from "react-icons/md";
import './CardStyle.css';
const CardPage = ({ number, title, text, image }) => {
    return (
        <div className="newsCard card relative news-Slide-up">
            <img src={image} alt={title} />
            <div className="card-number">{number}</div>
            <div className='newsCaption'>
                <div className='flex justify-between items-center'>
                    <h2 class=' text-2xl font-medium pb-5 pt-1'>{title}</h2>
                    <MdOutlineArrowForwardIos className='explore-icon ' />
                </div>
                <div className='newsCaption-content'>
                    <p className=' text-sm text-white pb-4'>{text}</p>
                </div>
                <a href="#" className="explore-link">Explorer plus</a>
            </div>
        </div>
    );
}

export default CardPage
