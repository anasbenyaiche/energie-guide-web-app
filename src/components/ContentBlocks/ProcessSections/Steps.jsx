import React from 'react'

const Steps = ({ title, description, stepNumber, children, isOpen, onClick }) => {


    return (
        <div className={`step ${isOpen ? 'active' : ''}`}>
            <div className="step-header" onClick={onClick}>
                <div className="step-number">
                    {stepNumber}
                </div>
                <div className="step-title">
                    {title}
                </div>
            </div>
            {isOpen && (
                <div className="step-content">
                    <div>{description}</div>
                    {children}
                </div>
            )}
        </div>
    )
}

export default Steps
