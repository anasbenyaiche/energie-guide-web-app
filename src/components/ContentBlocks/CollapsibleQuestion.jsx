import React from 'react'
import PropTypes from 'prop-types'
import { CiSquareRemove } from "react-icons/ci";

const CollapsibleQuestion = ({ question, response, handleQuestion, remove }) => {
    return (
        <div className=' my-4  w-5/6 mx-auto border rounded'>
            <div className='flex justify-end'>
                <button
                    className="text-red-500 p-2 text-3xl"
                    onClick={remove}
                >
                    <CiSquareRemove />
                </button>
            </div>
            <div className=' space-y-5 px-5 pb-5'>
                <div>

                    <p className=' mb-2 text-black text-base'>Question</p>
                    <div>
                        <textarea
                            className="py-3 px-4 block w-full  focus-visible:outline-none  border-gray-200 rounded-lg text-sm  bg-white border text-black"
                            placeholder="Add your Question here..."
                            name='question'
                            value={question}
                            onChange={handleQuestion}
                            rows="4" ></textarea>
                    </div>
                </div>
                <div className='mt-4'>
                    <p className=' mb-2 text-black text-base'>Response</p>
                    <div>
                        <textarea
                            className="py-3 px-4 block w-full focus-visible:outline-none  border-gray-200 rounded-lg text-sm  bg-white border text-black"
                            placeholder="Add your Response here..."
                            name='response'
                            value={response}
                            onChange={handleQuestion}
                            rows="4" ></textarea>
                    </div>
                </div>
            </div>
        </div>
    )
}
CollapsibleQuestion.prototype = {
    fromQa: PropTypes.shape({
        question: PropTypes.string,
        response: PropTypes.string
    }).isRequired,
    handleQuestion: PropTypes.func.isRequired,
}

export default CollapsibleQuestion
