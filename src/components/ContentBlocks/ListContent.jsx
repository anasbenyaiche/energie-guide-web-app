import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import PreviewFlow from './PreviewFlow';
import PreviewImage from './PreviewImage';
import PreviewCollapsible from './PreviewCollapsible';
import PreviewStepSectionEditor from './PreviewStep/PreviewStepSectionEditor';
import FaqSectionQuestion from '../FAQSection/FaqSectionQuestion';
import { sections as initialSections } from '../../utils/sectionsData';
import TextContent from './EditorText/TextContent';
import edit from '../../assets/icon/pencil.svg';
import editred from '../../assets/icon/pencil-red.svg';
import trash from '../../assets/icon/trash.svg';
import drag from '../../assets/icon/drag.svg';
import EditTextEditor from './EditTextEditor';
import EditLink from './EditLink';
import EditTable from './EditTable';
import EditUploadImage from './EditUploadImage';
import EditCollapsible from './EditCollapsible';
import EditCollapsibleFaq from '../FAQSection/EditCollapsibleFaq'
import EditStep from '../ContentBlocks/PreviewStep/EditStep'
import EditFlowWrapper from '../ContentBlocks/EditFLow'
const ListContent = ({ handleSaveEdit, blocks, onDelete, onEdit, ...props }) => {

    const [visibleQuestion, setVisibleQuestion] = useState(10)
    const [showall, setshawall] = useState(false)
    const [openQuestion, setOpenQuestion] = useState(null);
    const [sectionData, setSectionData] = useState(initialSections);
    const [editingBlockId, setEditingBlockIdState] = useState(null);
    let content;

    if (blocks.type === 'qasection' || blocks.type === 'faqsection') {
        try {
            content = JSON.parse(blocks.content);
        } catch (error) {
            console.error("Error parsing content:", error);
        }
    }
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
    const handleEdit = (blockId) => {
        setEditingBlockIdState(blockId);
    };


    return (
        <div className=' mb-5 p-3 border rounded-md shadow-md' {...props} >
            <div className='gap-4 flex items-center justify-between mb-4 mt-4'>
                <div className='text-primary-text text-xl'>
                    Block Position: {blocks.position}
                </div>
                <div className='flex justify-center items-center gap-3'>
                    <div className=' cursor-move hover:underline'>
                        <img src={drag} alt="drag" className=' w-5' />
                    </div>
                    <div>
                        <button className={`bg-transparent  border-none  focus:outline-none ${editingBlockId === blocks._id ? 'changedimage' : ''} `}
                            onClick={() => handleEdit(blocks._id)}>  {editingBlockId === blocks._id ? (<img src={editred} alt="edit" className=' w-5' />) : (<img src={edit} alt="edit" className=' w-5' />)} </button>
                    </div>
                    <div>
                        <button className=' bg-transparent  border-none   focus:outline-none'
                            onClick={() => onDelete(blocks._id)}> <img src={trash} alt="trash" className=' w-5' /> </button>
                    </div>
                </div>

            </div>
            {editingBlockId === blocks._id ? (
                <>
                    {blocks.type === 'text' && (
                        <EditTextEditor block={blocks} onSave={(updatedBlock) => {
                            handleSaveEdit(updatedBlock);
                            setEditingBlockIdState(null)
                        }} onClose={() => setEditingBlockIdState(null)} />
                    )}
                    {blocks.type === 'link' && (
                        <EditLink block={blocks}
                            onSave={(updatedBlock) => {
                                handleSaveEdit(updatedBlock);
                                setEditingBlockIdState(null)
                            }} onClose={() => setEditingBlockIdState(null)} />
                    )}
                    {blocks.type === 'table' && (
                        <EditTable block={blocks}
                            onSave={(updatedBlock) => {
                                handleSaveEdit(updatedBlock);
                                setEditingBlockIdState(null)
                            }}
                            onClose={() => setEditingBlockIdState(null)} />
                    )}
                    {blocks.type === 'image' && (
                        <EditUploadImage block={blocks} onSave={(updatedBlock) => {
                            handleSaveEdit(updatedBlock);
                            setEditingBlockIdState(null)
                        }} onClose={() => setEditingBlockIdState(null)} />
                    )}
                    {blocks?.type === "qasection" && (
                        <EditCollapsible
                            block={blocks}
                            onSave={(updatedBlock) => {
                                handleSaveEdit(updatedBlock);
                                setEditingBlockIdState(null)
                            }}
                            onClose={() => setEditingBlockIdState(null)}
                        />
                    )}
                    {blocks?.type === "faqsection" && (
                        <EditCollapsibleFaq
                            block={blocks}
                            onSave={(updatedBlock) => {
                                handleSaveEdit(updatedBlock);
                                setEditingBlockIdState(null)
                            }}
                            onClose={() => setEditingBlockIdState(null)}
                        />
                    )}
                    {blocks?.type === "stepsection" && (
                        <EditStep
                            block={blocks}
                            onSave={(updatedBlock) => {
                                handleSaveEdit(updatedBlock);
                                setEditingBlockIdState(null)
                            }}
                            onClose={() => setEditingBlockIdState(null)}
                        />
                    )}
                    {blocks?.type === "charts" && (
                        <EditFlowWrapper
                            block={blocks}
                            onSave={(updatedBlock) => {
                                handleSaveEdit(updatedBlock);
                                setEditingBlockIdState(null)
                            }}
                            onClose={() => setEditingBlockIdState(null)}
                        />
                    )}
                </>
            ) : (
                <>
                    {blocks.type === 'text' &&
                        (
                            <TextContent blocks={blocks} />
                        )}


                    {blocks.type === 'link' && (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: blocks.content,
                            }}
                        />
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


                    {blocks.type === 'charts' && (
                        <PreviewFlow content={blocks.content} />
                    )}
                    {blocks.type === 'image' && (
                        <PreviewImage imageUrl={blocks.imageUrl} title={blocks.content} />
                    )}
                    {blocks.type === 'stepsection' && (
                        <PreviewStepSectionEditor blocks={blocks} />
                    )}
                </>
            )}
        </div>
    )
}
ListContent.propTypes = {
    blocks: propTypes.shape({
        _id: propTypes.string.isRequired,
        position: propTypes.number.isRequired,
        content: propTypes.oneOfType([propTypes.string, propTypes.object]).isRequired,
        type: propTypes.string.isRequired,
        imageUrl: propTypes.string,
    }).isRequired,
    onDelete: propTypes.func.isRequired,
    onEdit: propTypes.func.isRequired,
}

export default ListContent
