import React from 'react'
import CardPage from './CardPage';
const CardList = ({ title }) => {

    const cards = [
        {
            number: "01",
            title: "Autoconsommation",
            text: "Deux configurations existent : sur site, où la production et la consommation sont locales, et déportées, nécessitant un transport sur le réseau.",
            image: "https://images.unsplash.com/photo-1591485423007-765bde4139ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
        },
        {
            number: "02",
            title: "Autorisations",
            text: "Deux configurations existent : sur site, où la production et la consommation sont locales, et déportées, nécessitant un transport sur le réseau",
            image: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        },
        {
            number: "03",
            title: "Concessions",
            text: "Deux configurations existent : sur site, où la production et la consommation sont locales, et déportées, nécessitant un transport sur le réseau",
            image: "https://images.unsplash.com/photo-1534251369789-5067c8b8602a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        }
    ];

    return (
        <div>
            <div className=' p-4 flex items-center justify-between gap-10'>
                <h2 className=' flex-1 text-black text-3xl font-bold'>
                    {title}
                </h2>
                <p className=' flex-1 text-sm text-black font-light'>
                    Cette section présente de manière exhaustive et structurée l’ensemble des procédures prévues par les différentes administrations pour le développement des projets de production d’électricité à partir des énergies renouvelables en Tunisie sous trois régimes : l’autoconsommation MT/HT, les autorisations et les concessions. Toutes les procédures recensées et les documents exigés sont présentés de manière logique en suivant le processus de développement des projets par type de régime. Les tâches importantes qui ne sont pas liées à une administration particulière mais qui sont essentielles au développement d’un projet sont également décrites.
                </p>
            </div>
            <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                {cards.map((card, index) => (
                    <CardPage
                        index={index}
                        number={card.number}
                        title={card.title}
                        card={card.image}
                        text={card.text}
                        image={card.image}
                    />
                ))}
            </div>
        </div>
    )
}

export default CardList
