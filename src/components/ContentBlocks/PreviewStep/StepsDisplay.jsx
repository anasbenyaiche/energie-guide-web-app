import React from 'react'

const StepsDisplay = ({ steps }) => {
    return (
        <div>
            <div className="grid grid-cols-5  mt-4">
                {steps.slice(0, 5).map((step, index) => (
                    <div key={index} className="flex items-center relative stepsection">
                        <div className=" arrow text-white py-4 w-full h-32 flex flex-col justify-center">
                            <div className=' w-4/5 mx-auto p-1' >
                                <h3 className="font-bold text-sm"> {step.title} </h3>
                                <p className=' font-normal text-xs'> {step.text} </p>
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div className="absolute right-[-30px] top-1/2 transform -translate-y-1/2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-8 h-6 text-gray-500">
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
    )
}

export default StepsDisplay
