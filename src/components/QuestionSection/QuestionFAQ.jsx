import React from 'react'
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
const QuestionFAQ = ({ index, question, openQuestion, setOpenQuestion, response }) => {
    const toggleQuestion = (index) => {
        if (openQuestion === index) {
            setOpenQuestion(null);
        } else {
            setOpenQuestion(index);
        }
    };
    console.log(index)
    return (

        <div key={index} className={`${openQuestion === index ? 'bg-[#F1F1F1]' : 'bg-white'}`}>
            <div className="flex font-bold justify-between gap-4 px-3 py-4 items-center  border-b cursor-pointer" onClick={() => toggleQuestion(index)}>
                <span>{question}</span>
                <span>{openQuestion === index ? <MdKeyboardArrowDown className='text-xl' /> : <MdKeyboardArrowRight className='text-xl' />}</span>
            </div>
            <div
                className={`overflow-hidden transition-all px-3 py-2 duration-500 ${openQuestion === index ? ' max-h-96' : 'max-h-0'}`}
            >
                <p className="mt-1">{response}</p>
            </div>
        </div>

    )
}

export default QuestionFAQ
