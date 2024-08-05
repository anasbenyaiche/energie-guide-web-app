import React from 'react'
import picture1 from '../../assets/image/avec_transport.jpg';
import picture2 from '../../assets/image/societe_autoproduction.jpg';
import picture3 from '../../assets/image/sans_transport.jpg';
import hovredpic from '../../assets/image/autoconsommation.jpg'
import CardPage from '../MainCard/CardPage';

const AutoconsCardList = ({ title }) => {
    const cards = [
        {
            number: "01",
            title: "Sans Transport",
            text: "Deux configurations existent : sur site, où la production et la consommation sont locales, et déportées, nécessitant un transport sur le réseau.",
            image: picture3,
            url: "sans_transport",
            hovredimg: hovredpic

        },
        {
            number: "02",
            title: "Avec Transport",
            text: "Deux configurations existent : sur site, où la production et la consommation sont locales, et déportées, nécessitant un transport sur le réseau",
            image: picture1,
            url: "avec_transport",
            hovredimg: hovredpic
        },
        {
            number: "03",
            title: "Société d'autoproduction",
            text: "Deux configurations existent : sur site, où la production et la consommation sont locales, et déportées, nécessitant un transport sur le réseau",
            image: picture2,
            url: "societe_autoproduction",
            hovredimg: hovredpic
        }
    ];

    return (
        <div className=' row mx-auto'>
            <div className='flex items-center justify-between gap-10 mt-8'>
                <h2 className=' flex-1 text-black text-3xl font-bold'>
                    {title}
                </h2>
                <p className=' flex-1 text-sm text-black font-light'>
                    Cette section présente de manière exhaustive et structurée l’ensemble des procédures prévues par les différentes administrations pour le développement des projets de production d’électricité à partir des énergies renouvelables en Tunisie sous trois régimes : l’autoconsommation MT/HT, les autorisations et les concessions. Toutes les procédures recensées et les documents exigés sont présentés de manière logique en suivant le processus de développement des projets par type de régime. Les tâches importantes qui ne sont pas liées à une administration particulière mais qui sont essentielles au développement d’un projet sont également décrites.
                </p>
            </div>
            <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <CardPage
                        index={index}
                        number={card.number}
                        title={card.title}
                        card={card.image}
                        url={card.url}
                        text={card.text}
                        image={card.image}
                        hovredimg={hovredpic}
                        hoverEffect={true}
                    />
                ))}
            </div>
        </div>
    )
}

export default AutoconsCardList
