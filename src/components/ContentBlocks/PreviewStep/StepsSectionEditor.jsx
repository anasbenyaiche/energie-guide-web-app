import React from 'react';
import TextEditor from '../TextEditor';
import { convertToRaw } from 'draft-js';
const StepSectionEditor = ({ steps, setSteps, editorState, onEditorStateChange }) => {
    const handleChangeStep = (index, field, value) => {
        const updatedSteps = steps.map((step, i) =>
            i === index ? { ...step, [field]: value } : step
        );
        setSteps(updatedSteps);
    };



    return (
        <div className=' w-full'>
            <TextEditor editorState={editorState} onEditorStateChange={onEditorStateChange} convertedContent={convertToRaw(editorState.getCurrentContent())} />
            <div className="grid grid-cols-5 gap-4 mt-4 space-x-4">
                {steps.slice(0, 5).map((step, index) => (
                    <div key={index} className="flex items-center relative stepsection">
                        <div className="arrow text-white py-4 w-full h-32 flex flex-col justify-center">
                            <div className='w-4/5 mx-auto p-1'>
                                <input
                                    type="text"
                                    className="w-full text-sm p-2 font-bold mb-2 text-white placeholder-gray-300 bg-transparent border-0 border-b border-white appearance-none focus:outline-none focus:ring-0"
                                    placeholder="Step Title"
                                    value={step.title}
                                    onChange={(e) => handleChangeStep(index, 'title', e.target.value)}
                                />
                                <textarea
                                    className="w-full p-2 mb-2 text-xs overflow-hidden placeholder-gray-300 text-white bg-transparent border-0 border-b border-white appearance-none focus:outline-none focus:ring-0"
                                    placeholder="Step Text"
                                    value={step.text}
                                    onChange={(e) => handleChangeStep(index, 'text', e.target.value)}
                                />
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className="absolute right-[-35px] top-1/2 transform -translate-y-1/2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className=" w-8 h-6 text-gray-500">
                                    <path
                                        fillRule="evenodd"
                                        d="M15.293 7.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L18.586 14H3a1 1 0 110-2h15.586l-3.293-3.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StepSectionEditor;
