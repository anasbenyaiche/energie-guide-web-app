import React, { useEffect, useState } from 'react'
import { sections as initialSections } from '../../utils/sectionsData';
import CollapsibleQuestion from '../ContentBlocks/CollapsibleQuestion';

const EditCollapsibleFaq = ({ block, onClose, onSave }) => {

    const [sectionData, setSectionData] = useState(initialSections);

    useEffect(() => {
        if (block && block.content) {
            try {
                const parsedContent = JSON.parse(block.content);
                if (Array.isArray(parsedContent)) {
                    setSectionData(parsedContent);
                }
            } catch (e) {
                console.error("Failed to parse block content", e);
            }
        }
    }, [block]);

    const handleQuestionChangeFAQ = (e, sectionIndex, questionIndex) => {
        const { name, value } = e.target;
        const newSectionData = [...sectionData];
        const field = name.split('-')[0];
        newSectionData[sectionIndex].questions[questionIndex][field] = value;
        setSectionData(newSectionData);
    };
    const addQuestionFAQ = (sectionIndex) => {
        const newSectionData = [...sectionData];
        newSectionData[sectionIndex].questions.push({ question: '', response: '' });
        setSectionData(newSectionData);
    };

    const removeQuestionFAQ = (sectionIndex, questionIndex) => {
        const newSectionData = [...sectionData];
        newSectionData[sectionIndex].questions.splice(questionIndex, 1);
        setSectionData(newSectionData);
    };
    const handleSave = () => {
        const updatedBlock = { ...block, content: JSON.stringify(sectionData) };
        onSave(updatedBlock);
    };
    return (
        <div>
            {sectionData.map((section, sectionIndex) => (
                <div key={section.name} className=" border-b border-gray-200 py-4">
                    <h2 className="  text-lg font-semibold">{section.name}</h2>
                    {section.questions.map((qa, questionIndex) => (
                        <div key={questionIndex}>
                            <CollapsibleQuestion
                                section={section.name}
                                question={qa.question}
                                response={qa.response}
                                handleQuestion={(e) => handleQuestionChangeFAQ(e, sectionIndex, questionIndex)}
                                remove={() => removeQuestionFAQ(sectionIndex, questionIndex)}
                            />
                        </div>
                    ))}
                    <div className="flex justify-end">
                        <button onClick={() => addQuestionFAQ(sectionIndex)} className="mt-4 p-2 bg-[#00a2d6] text-white">Add Question</button>
                    </div>
                </div>
            ))}

            <div className="flex justify-end mt-4 gap-3">
                <button className="bg-red-500 text-white px-4 py-2 mr-2" onClick={onClose}>Cancel</button>
                <button className="bg-blue-500 text-white px-4 py-2" onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}

export default EditCollapsibleFaq
