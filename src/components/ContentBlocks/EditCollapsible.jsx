import React, { useEffect, useState } from 'react'
import CollapsibleQuestion from './CollapsibleQuestion';

const EditCollapsible = ({ block, onClose, onSave }) => {
    const [questions, setQuestions] = useState([
        { question: "", response: "", }
    ]);

    useEffect(() => {
        if (block && block.content) {
            try {
                const parsedContent = JSON.parse(block.content);
                if (Array.isArray(parsedContent)) {
                    setQuestions(parsedContent);
                }
            } catch (e) {
                console.error("Failed to parse block content", e);
            }
        }
    }, [block]);
    const handleQuestionChange = (e, index) => {
        const { name, value } = e.target;
        const newQuestions = [...questions];
        newQuestions[index] = { ...newQuestions[index], [name]: value };
        setQuestions(newQuestions);
    };
    const addQuestion = () => {
        setQuestions([...questions, { question: "", response: "", }]);
    };
    const removeQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };
    const handleSave = () => {
        const updatedBlock = { ...block, content: JSON.stringify(questions) };
        onSave(updatedBlock);
    };
    return (
        <div>
            <div className="modal">
                <div className="modal-content">
                    <div>
                        {questions.map((qa, index) => (
                            <div>
                                <CollapsibleQuestion key={index} index={index} question={qa.question} response={qa.response} handleQuestion={(e) => handleQuestionChange(e, index)}
                                    remove={() => removeQuestion(index)} />
                            </div>

                        ))}
                        <div className="flex justify-end">
                            <button onClick={addQuestion} className="mt-4 p-2 bg-[#00a2d6] text-white">Add Question</button>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4 gap-3">
                        <button className="bg-red-500 text-white px-4 py-2 mr-2" onClick={onClose}>Cancel</button>
                        <button className="bg-blue-500 text-white px-4 py-2" onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default EditCollapsible
