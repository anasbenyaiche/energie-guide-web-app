import React, { useState } from 'react'
import QuestionBlock from './QuestionBlock';
import StaticQuestionHome from './StaticQuestionHome';
const questionBlocks = [
    { question: "Qu'est-ce que l'autoconsommation dans le contexte des énergies renouvelables?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
    { question: "Comment fonctionne l'autoconsommation d'énergie renouvelable?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
    { question: "Qu'est-ce qu'une étude de faisabilité pour un projet d'autoconsommation?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
    { question: "Qu'est-ce qu'une étude de faisabilité pour un projet d'autoconsommation?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
    { question: "Qu'est-ce que l'autoconsommation dans le contexte des énergies renouvelables?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
    { question: "Comment fonctionne l'autoconsommation d'énergie renouvelable?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
    { question: "Qu'est-ce qu'une étude de faisabilité pour un projet d'autoconsommation?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
    { question: "Qu'est-ce qu'une étude de faisabilité pour un projet d'autoconsommation?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
    { question: "Qu'est-ce que l'autoconsommation dans le contexte des énergies renouvelables?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
    { question: "Comment fonctionne l'autoconsommation d'énergie renouvelable?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
    { question: "Qu'est-ce qu'une étude de faisabilité pour un projet d'autoconsommation?", answer: "L'autoconsommation consiste à produire de l'énergie renouvelable pour sa propre consommation..." },
];

const MainQuestion = () => {

    const [visibleQuestion, setVisibleQuestion] = useState(10)
    const [showall, setshawall] = useState(false)
    const handleallQuestion = () => {
        if (showall) {
            setVisibleQuestion(10)
        }
        else {
            setVisibleQuestion(questionBlocks.length)
        }

        setshawall(!showall)

    }
    console.log(questionBlocks)

    return (
        <div className="row mx-auto mt-10 mb-10 flex flex-col gap-4 text-black">
            <div className='mb-4 mt-8'>
                <h2 class="text-black text-4xl font-bold">Questions & Réponses</h2>
            </div>
            {questionBlocks.slice(0, visibleQuestion).map((block, index) => (
                <StaticQuestionHome key={index} question={block.question} answer={block.answer} />
            ))}
            {questionBlocks.length > 10 && (
                <div className=' flex justify-end'>
                    <div className='inline-flex justify-end items-center mt-5 gap-3 text-end px-4 btnquestion'>
                        <button className=' text-[#008AEE] hover:text-black' onClick={handleallQuestion}>
                            {showall ? 'Voir moin' : 'Voir plus'}
                        </button>
                        <hr className=" w-16 h-1 bg-[#008AEE]" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default MainQuestion
