import React from 'react'
import QuestionFAQ from '../QuestionSection/QuestionFAQ'
const FaqSectionQuestion = ({ name, icon, index, question, response, openQuestion, setOpenQuestion }) => {
    return (
        <div>
            <QuestionFAQ name={name} icon={icon} index={index} question={question} response={response} openQuestion={openQuestion}
                setOpenQuestion={setOpenQuestion}
            />
        </div>
    )
}

export default FaqSectionQuestion
