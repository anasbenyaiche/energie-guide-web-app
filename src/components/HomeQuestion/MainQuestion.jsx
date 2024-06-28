import React from 'react'
import QuestionBlock from './QuestionBlock';

const questionBlocks = [
    {
        questions: [
            { question: "Qu'est-ce que l'autoconsommation dans le contexte des énergies renouvelables?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
            { question: "Comment fonctionne l'autoconsommation d'énergie renouvelable?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
            { question: "Qu'est-ce qu'une étude de faisabilité pour un projet d'autoconsommation?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
            { question: "Qu'est-ce que l'autoconsommation dans le contexte des énergies renouvelables?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
            { question: "Comment fonctionne l'autoconsommation d'énergie renouvelable?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
            { question: "Qu'est-ce qu'une étude de faisabilité pour un projet d'autoconsommation?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
            { question: "Qu'est-ce que l'autoconsommation dans le contexte des énergies renouvelables?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
            { question: "Comment fonctionne l'autoconsommation d'énergie renouvelable?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
            { question: "Qu'est-ce qu'une étude de faisabilité pour un projet d'autoconsommation?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },

        ]
    },
];
const MainQuestion = () => {

    return (
        <div className="flex flex-col gap-4 text-black">
            <div className=' px-10 mb-4'>
                <h2 class="text-black text-4xl font-bold">Questions & Réponses</h2>
            </div>
            {questionBlocks.map((block, index) => (
                <QuestionBlock key={index} icon={block.icon} title={block.title} questions={block.questions} />
            ))}
        </div>
    )
}

export default MainQuestion
