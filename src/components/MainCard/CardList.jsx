import React from 'react'
import CardPage from './CardPage';
import autoc from '../../assets/image/autoconsommation.jpg';
import autor from '../../assets/image/autorisations.jpg';
import cons from '../../assets/image/concessions.jpg';
const CardList = ({ title }) => {

    const cards = [
        {
            number: "01",
            title: "Autoconsommation",
            text: "Deux configurations existent : sur site, où la production et la consommation sont locales, et déportées, nécessitant un transport sur le réseau.",
            image: autoc,
            hovredimg: autoc,
            url: "/autoconsommation"
        },
        {
            number: "02",
            title: "Autorisations",
            text: "Deux configurations existent : sur site, où la production et la consommation sont locales, et déportées, nécessitant un transport sur le réseau",
            image: autor,
            hovredimg: autor,
            url: "/autorisation"
        },
        {
            number: "03",
            title: "Concessions",
            text: "Deux configurations existent : sur site, où la production et la consommation sont locales, et déportées, nécessitant un transport sur le réseau",
            image: cons,
            hovredimg: cons,
            url: "/concession"
        }
    ];

    return (
        <div className=' row'>
            <div className=' py-4 block lg:flex items-center justify-between gap-10'>
                <h2 className=' flex-1 text-black text-3xl font-bold mb-5 lg:mb-0'>
                    {title}
                </h2>
                <p className=' flex-1 text-sm text-black font-light'>
                    Cette section présente de manière exhaustive et structurée l’ensemble des procédures prévues par les différentes administrations pour le développement des projets de production d’électricité à partir des énergies renouvelables en Tunisie sous trois régimes : l’autoconsommation MT/HT, les autorisations et les concessions. Toutes les procédures recensées et les documents exigés sont présentés de manière logique en suivant le processus de développement des projets par type de régime. Les tâches importantes qui ne sont pas liées à une administration particulière mais qui sont essentielles au développement d’un projet sont également décrites.
                </p>
            </div>
            <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
                {cards.map((card, index) => (
                    <CardPage
                        index={index}
                        number={card.number}
                        title={card.title}
                        card={card.image}
                        text={card.text}
                        image={card.image}
                        hovredimg={card.hovredimg}
                        url={card.url}
                    />
                ))}
            </div>
        </div>
    )
}

export default CardList
