import React, { useState } from 'react'
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";


const QuestionBlock = ({ icon, title, questions }) => {
    const [openQuestion, setOpenQuestion] = useState(null);

    const toggleQuestion = (index) => {
        if (openQuestion === index) {
            setOpenQuestion(null);
        } else {
            setOpenQuestion(index);
        }
    };
    return (
        <div className="p-4 flex items-start gap-8">
            <div className=' w-1/4 flex flex-col justify-start  items-start'>
                <div className='bg-[#f2f2f2] p-[70px]'>
                    <div className=''> <img src={icon} alt={title} /></div>
                </div>
                <h2 className="text-2xl font-bold  mt-4">{title}</h2>
            </div>
            <div className=" flex-1 border-l-2 border-[#D9D9D9] px-4">
                {questions.map((q, index) => (
                    <div key={index} className={`${openQuestion === index ? 'bg-[#F1F1F1]' : 'bg-white'}`}>
                        <div className="flex font-bold justify-between gap-4 px-3 py-4 items-center  border-b cursor-pointer" onClick={() => toggleQuestion(index)}>
                            <span>{q.question}</span>
                            <span>{openQuestion === index ? <MdKeyboardArrowDown className='text-xl' /> : <MdKeyboardArrowRight className='text-xl' />}</span>
                        </div>
                        <div
                            className={`overflow-hidden transition-all px-3 py-2 duration-500 ${openQuestion === index ? ' max-h-96' : 'max-h-0'}`}
                        >
                            <p className="mt-1">{q.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionBlock
