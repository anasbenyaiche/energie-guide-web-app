import React from 'react'
import QuestionBlock from '../HomeQuestion/QuestionBlock'

const PreviewCollapsible = ({ index, question, response, openQuestion, setOpenQuestion }) => {
    return (
        <div>
            <QuestionBlock index={index} question={question} response={response} openQuestion={openQuestion}
                setOpenQuestion={setOpenQuestion} />
        </div>
    )
}

export default PreviewCollapsible
