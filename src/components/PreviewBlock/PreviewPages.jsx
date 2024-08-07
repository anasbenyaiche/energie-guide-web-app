import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import PreviewFlow from '../ContentBlocks/PreviewFlow'
import PreviewImage from '../ContentBlocks/PreviewImage'
import PreviewCollapsible from '../ContentBlocks/PreviewCollapsible'
import PreviewStepSectionEditor from '../ContentBlocks/PreviewStep/PreviewStepSectionEditor'
import { sections as initialSections } from '../../utils/sectionsData'
import FaqSectionQuestion from '../FAQSection/FaqSectionQuestion'
import TextContent from '../ContentBlocks/EditorText/TextContent'

const PreviewPages = ({ blocks }) => {
    const [openQuestion, setOpenQuestion] = useState(null);
    const [visibleQuestion, setVisibleQuestion] = useState(10)
    const [showall, setshawall] = useState(false)
    const [sectionData, setSectionData] = useState(initialSections);
    let content;

    if (blocks.type === 'qasection' || blocks.type === 'faqsection') {
        try {
            content = JSON.parse(blocks.content);
        } catch (error) {
            console.error("Error parsing content:", error);
        }
    }
    // useEffect(() => {
    //     const initialVisibleQuestions = {};
    //     initialSections.forEach(section => {
    //         initialVisibleQuestions[section.name] = 10;
    //     });
    //     setVisibleQuestion(initialVisibleQuestions);
    // }, [initialSections]);
    useEffect(() => {
        if (blocks.type === 'faqsection' && content) {
            const updatedSections = initialSections.map((section) => {
                const matchingSection = content.find((sec) => sec.name === section.name);
                return matchingSection ? { ...section, questions: matchingSection.questions } : section;
            });
            if (JSON.stringify(sectionData) !== JSON.stringify(updatedSections)) {
                setSectionData(updatedSections);
            }
        }
    }, [blocks.type, content]);
    const handleallQuestion = () => {
        if (showall) {
            setVisibleQuestion(10)
        }
        else {
            setVisibleQuestion(content.length)
        }

        setshawall(!showall)

    }
    const handleAllMQuestion = (sectionName) => {
        setVisibleQuestion(prevState => ({
            ...prevState,
            [sectionName]: prevState[sectionName] === 10 ? sectionData.find(section => section.name === sectionName).questions.length : 10
        }));
    };

    return (
        <div className='mb-3 p-3  text-black'>
            {blocks.type === 'text' &&
                (
                    <TextContent blocks={blocks} />
                )}

            {blocks.type === 'charts' && (
                <PreviewFlow content={blocks.content} />
            )}
            {blocks.type === 'image' && (
                <PreviewImage imageUrl={blocks.imageUrl} title={blocks.content} />
            )}
            {blocks.type === 'stepsection' && (
                <PreviewStepSectionEditor blocks={blocks} />
            )}
            {blocks.type === 'table' && (
                <div
                    dangerouslySetInnerHTML={{
                        __html: blocks.content,
                    }}
                />
            )}
            {blocks.type === 'qasection' && content && (
                <>
                    {content.slice(0, visibleQuestion).map((qa, index) => (
                        <PreviewCollapsible key={index} index={index} question={qa.question} response={qa.response}
                            openQuestion={openQuestion}
                            setOpenQuestion={setOpenQuestion}
                        />
                    ))}

                    {content.length > 10 && (
                        <div className=' flex justify-end'>
                            <div className='inline-flex justify-end items-center mt-5 gap-3 text-end px-4 btnquestion'>
                                <button className=' text-[#008AEE] hover:text-black' onClick={handleallQuestion}>
                                    {showall ? 'Voir moin' : 'Voir plus'}
                                </button>
                                <hr className=" w-16 h-1 bg-[#008AEE]" />
                            </div>
                        </div>
                    )}
                </>
            )}
            {blocks.type === 'faqsection' && content && (
                <>
                    {sectionData.map((section) => (
                        <div key={section.name} className="p-4 flex items-start gap-8">
                            <div className=' w-1/4 flex flex-col justify-start  items-start'>
                                <div className='bg-[#f2f2f2] p-[70px]'>
                                    <div className=''> <img src={section.icon} alt={section.name} /></div>
                                </div>
                                <h2 className="text-2xl font-bold  mt-4">{section.name}</h2>
                            </div>
                            <div className="flex-1 border-l-2 px-4 border-gray-200">
                                {section.questions.slice(0, visibleQuestion[section.name] || 10).map((qa, index) => {
                                    const uniqueKey = `${section.name}-${index}`;
                                    return (
                                        <FaqSectionQuestion name={section.name} icon={section.icon} key={uniqueKey}
                                            uniqueKey={uniqueKey} question={qa.question} response={qa.response}
                                            openQuestion={openQuestion}
                                            setOpenQuestion={setOpenQuestion}
                                        />
                                    )
                                })}
                                {section.questions.length > 10 && (
                                    <div className=' flex justify-end'>
                                        <div className='inline-flex justify-end items-center mt-5 gap-3 text-end px-4 btnquestion'>
                                            <button className=' text-[#008AEE] hover:text-black' onClick={() => handleAllMQuestion(section.name)}>
                                                {visibleQuestion[section.name] === 10 ? 'Voir plus' : 'Voir moins'}
                                            </button>
                                            <hr className=" w-16 h-1 bg-[#008AEE]" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

PreviewPages.propTypes = {
    blocks: propTypes.shape({
        content: propTypes.oneOfType([propTypes.string, propTypes.object]).isRequired,
    }).isRequired,
}

export default PreviewPages
