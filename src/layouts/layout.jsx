// eslint-disable-next-line no-unused-vars
import React from 'react';
import './NavHomeAndMenu.css'; // Import the merged CSS file
import { Link } from 'react-router-dom';

const Layout = () => {
  const navHomeItems = [
    { text: 'Contexte énergétique', link: '/contextEnergitique' },
    { text: 'Cadre règlementaire' },
    { text: 'Acteurs des énergies renouvelables en Tunisie' },
    { text: 'Processus de développement des projets d’énergies renouvelables' },
    { text: 'Environnement d’investissement et cadre incitatif en faveur des énergies renouvelables' },
    { text: 'Ressources documentaires' },
    { text: 'Acteurs des énergies renouvelables en Tunisie' },
    { text: 'Processus de développement des projets d’énergies renouvelables' },
    { text: 'Environnement d’investissement et cadre incitatif en faveur des énergies renouvelables' },
    { text: 'Ressources documentaires' },
    
    
  ];

  const navMenuItems = [
    'Context énergétique',
    'Cadre règlementaire',
    'Acteur des énergies renouvelables Tunisie',
    'Processus de développement des projets d\'énergies renouvelables',
    'Environnement d\'investissement et cadre incitatif en faveur des énergies renouvelables',
    'Resources documentaires',
    
  ];

  return (
    <div>
      <div className='Path'>
        Vous êtes ici : Bienvenue » Thèmes » Energies renouvelables » Publications » Guides digitales » Projets d’énergie renouvelable en Tunisie : Guide détaillé
      </div>
<div className='container1'>
      <div className="nav-home-container">
        <div className="nav-home-image">
          <img src="src\assets\energie.png" alt="" />
        </div>
        <div className="list">
          <ul>
            <h1 className='title1'>PROJETS D’ÉNERGIE RENOUVELABLE EN TUNISIE : Guide Détaillé</h1>
            {navHomeItems.map((item, index) => (
              <li key={index} className={`item${index + 1}`}>
                {item.link ? <Link to={item.link}><span>{item.text}</span></Link> : <span>{item.text}</span>}
              </li>
            ))}
          </ul>
        </div>
      

      <div className="nav-menu">
        <div className="title">
          PROJETS D’ÉNERGIE RENOUVELABLE EN TUNISIE : <span className="guide-detail">Guide Détaillé</span>
          <ul className="subtitle-list">
            {navMenuItems.map((item, index) => (
              <li key={index} className="subtitle">{item}</li>
            ))}
          </ul>
        </div>
        <div className="line"></div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Layout;
