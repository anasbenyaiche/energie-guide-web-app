import React from 'react'
import PropTypes from 'prop-types'
const CollapsibleQuestion = ({ question, response, handleQuestion }) => {
    return (
        <div className=' w-4/5 mx-auto space-y-5 p-5 border rounded '>
            <div>
                <p className=' mb-2 text-black text-base'> Add Question</p>
                <div>
                    <textarea
                        className="py-3 px-4 block w-full  border-gray-200 rounded-lg text-sm  bg-white border text-black"
                        placeholder="Add your Question here..."
                        name='question'
                        value={question}
                        onChange={handleQuestion}
                        rows="4" ></textarea>
                </div>
            </div>
            <div className='mt-4'>
                <p className=' mb-2 text-black text-base'> Add Response</p>
                <div>
                    <textarea
                        className="py-3 px-4 block w-full  border-gray-200 rounded-lg text-sm  bg-white border text-black"
                        placeholder="Add your Response here..."
                        name='response'
                        value={response}
                        onChange={handleQuestion}
                        rows="4" ></textarea>
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
