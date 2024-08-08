import React from 'react'
import solar from '../../assets/icon/i_solar.svg';
import factory from '../../assets/icon/i_factory.svg';
import partner from '../../assets/icon/i_partner.svg';
import { Link } from 'react-router-dom';
const FixedIcons = () => {
    return (
        <div className='fixed right-4 top-1/2 '>
            <div className='transform -translate-y-2/3 flex  items-center'>
                <div className="text-vertical text-sm">LIEN RAPIDE</div>
                <div className="line_rapidlink"></div>
            </div>
            <div className="transform -translate-y-1/2 flex flex-col items-center space-y-4">
                <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center shadow-lg">
                    <Link to='/autoconsommation'>
                        <img src={factory} alt="Icon 1" className="w-6 h-6" />
                    </Link>
                </div>
                <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center shadow-lg">
                    <Link to='/autorisation'>
                        <img src={solar} alt="Icon 2" className="w-6 h-6" />
                    </Link>
                </div>
                <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center shadow-lg">
                    <Link to='/concession'>
                        <img src={partner} alt="Icon 3" className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FixedIcons
