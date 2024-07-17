import React from 'react'
import partner from '../assets/icon/partner.png'
import solar from '../assets/icon/solar.png'
import autocon from '../assets/icon/autocon.png'
import QuestionBlock from '../components/QuestionSection/QuestionBlock'
import MenuPage from '../components/MenuPages/MenuPage'
const FAQPage = () => {

    const questionBlocks = [
        {
            icon: autocon,
            title: "Autoconsommation",
            questions: [
                { question: "Qu'est-ce que l'autoconsommation dans le contexte des énergies renouvelables?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
                { question: "Comment fonctionne l'autoconsommation d'énergie renouvelable?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
                { question: "Qu'est-ce qu'une étude de faisabilité pour un projet d'autoconsommation?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },

            ]
        },
        {
            icon: solar,
            title: "Autorisations",
            questions: [
                { question: "Qu'est-ce qu'une autorisation?", answer: "Une autorisation est un document légal requis pour..." },
                { question: "Comment fonctionne l'autoconsommation d'énergie renouvelable?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
                { question: "Qu'est-ce qu'une étude de faisabilité pour un projet d'autoconsommation?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
            ]
        },
        {
            icon: partner,
            title: "Concessions",
            questions: [
                { question: "Qu'est-ce qu'une concession?", answer: "Une concession est un accord contractuel entre deux parties..." },
                { question: "Comment fonctionne l'autoconsommation d'énergie renouvelable?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
                { question: "Qu'est-ce qu'une étude de faisabilité pour un projet d'autoconsommation?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
            ]
        },
    ];


    return (
        <div>
            <MenuPage />
            <div className="faq-page container mx-auto p-8">
                <div className='flex items-center justify-between p-4 mb-10'>
                    <div>
                        <h2 class="text-black text-4xl font-bold">Questions & Réponses</h2>
                    </div>
                    <div className=' w-3/5 block'>
                        <div className="bg-white border-2 w-full p-2 relative flex">
                            <span className="w-auto flex justify-end  items-center text-[#555555] p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </span>
                            <input name="episodequery" id="title" className="bg-white border-[#999999] text-[#555555] outline-none border-0 w-full p-2" type="text"
                                placeholder="Rechercher de question ou mot clés" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 text-black">
                    {questionBlocks.map((block, index) => (
                        <QuestionBlock key={index} icon={block.icon} title={block.title} questions={block.questions} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FAQPage
