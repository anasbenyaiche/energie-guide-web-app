import React, { useEffect, useRef, useState } from "react";
import ListContent from "../components/ContentBlocks/ListContent";
import { useParams } from "react-router-dom";
import TextEditor from "../components/ContentBlocks/TextEditor";
import { EditorState } from "draft-js";
import { stateToHTML } from 'draft-js-export-html';
import TableEditor from "../components/ContentBlocks/TableEditor";
import CreateLink from "../components/ContentBlocks/CreateLink";
import UploadImage from "../components/ContentBlocks/UploadImage";
import DOMPurify from "dompurify";
import HorizontalFlowWrapper from "../components/ContentBlocks/HorizontalFlow";
import useSaveBlock from "../hooks/useSaveBlock";
import useDeleteBlock from "../hooks/useDeleteBlock";
import useDisplayBlock from "../hooks/useDisplayBlock";
import useCreateBlock from "../hooks/useCreateBlock";
import useUpdateBlock from "../hooks/useUpdateBlock";
import useUploadPicture from "../hooks/useUploadPicture";
import MenuContent from "../components/ContentBlocks/MenuContent";
import CollapsibleQuestion from "../components/ContentBlocks/CollapsibleQuestion";
import { FaPlus } from "react-icons/fa";
import blockStyleFn from "../utils/blockStyleFn";
import StepsSectionEditor from "../components/ContentBlocks/PreviewStep/StepsSectionEditor";
import { sections } from "../utils/sectionsData";


const PreviewContent = () => {
    const { pageId } = useParams();
    const id = pageId
    const [content, setContent] = useState([]);
    const [selectedBlock, setSelectedBlock] = useState(null);
    const [selectedNode, setSelectedNode] = useState({
        type: 'charts',
        nodes: [],
        edges: [],
    });
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [image, setImage] = useState(null);
    const [steps, setSteps] = useState([
        { title: '', text: '' },
        { title: '', text: '' },
        { title: '', text: '' },
        { title: '', text: '' },
        { title: '', text: '' }
    ]);
    const [convertedContent, setConvertedContent] = useState("");
    const [convertstepText, setConvertstepText] = useState("")
    const [selected, setSelcted] = useState("text");
    const [position, setPosition] = useState(() => {
        const savedPostion = localStorage.getItem("position");
        return savedPostion ? parseInt(savedPostion, 10) : 1;
    });
    const [rfInstance, setRfInstance] = useState(null);
    const [openBlock, setOpenBlock] = useState(null);
    const [tableData, setTableData] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]);
    const [formLink, setFormLink] = useState({
        link: "",
        title: "",
    });

    const [questions, setQuestions] = useState([
        { question: "", response: "", }
    ]);
    const [sectionData, setSectionData] = useState(sections);
    const [formPicture, setFormPicture] = useState({
        title: ""
    })

    const { saveBlock, error: saveError } = useSaveBlock();
    const { deleteBlock, error: deleteError } = useDeleteBlock()
    const { displaycontent, error: displayError } = useDisplayBlock()
    const { updateBlockPositions, error: updateError } = useUpdateBlock();
    const { handleUpload, error: uploadError } = useUploadPicture({
        position, image, setOpenBlock, formPicture, id: pageId
    });

    const { submitContentBlock } = useCreateBlock({
        selected,
        convertedContent,
        editorState,
        convertstepText,
        tableData,
        formLink,
        questions,
        sectionData,
        rfInstance,
        steps,
        position,
        id: pageId,
        setPosition,
        setConvertedContent,
        setConvertstepText,
        setEditorState,
        setSectionData,
        setFormLink,
        setQuestions,
        setOpenBlock,
    })

    const handleImageChange = (e) => {
        const { name, value } = e.target;
        setFormPicture({ ...formPicture, [name]: value });
    }

    const handleLinkChange = (e) => {
        const { name, value } = e.target;
        setFormLink({ ...formLink, [name]: value });
    };
    const handleQuestionChange = (e, index) => {
        const { name, value } = e.target;
        const newQuestions = [...questions];
        newQuestions[index] = { ...newQuestions[index], [name]: value };
        setQuestions(newQuestions);
    };
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

    const addQuestion = () => {
        setQuestions([...questions, { question: "", response: "", }]);
    };
    const removeQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };
    const handelBlockClick = (block) => {
        if (openBlock === block) {
            setOpenBlock(null);
            setSelcted("");
        } else {
            setOpenBlock(block);
            setSelcted(block);
        }
    };
    const recalculatePositions = (blocks) => {
        blocks.forEach((block, index) => {
            block.position = index;
        });
        setContent([...blocks]);
        localStorage.setItem("position", blocks.length - 1);
    };
    useEffect(() => {
        const contentState = editorState.getCurrentContent();
        const html = stateToHTML(contentState, {
            blockStyleFn: blockStyleFn,
        });
        const sanitizedHtml = DOMPurify.sanitize(html);
        setConvertedContent(sanitizedHtml);
    }, [editorState]);

    const handelDelete = async (id) => {
        deleteBlock(id, setContent, content)
    };
    const handleEdit = (block) => {
        setSelectedBlock(block);
        setSelectedNode(block)
    };

    const handleSave = async (updatedBlock) => {
        saveBlock(updatedBlock, setContent, content);
    };

    const dragBlock = useRef(0);
    const dragOverBlock = useRef(0);

    const handelSort = async () => {
        const blockClone = [...content];
        const temp = blockClone[dragBlock.current];
        blockClone[dragBlock.current] = blockClone[dragOverBlock.current];
        blockClone[dragOverBlock.current] = temp;
        recalculatePositions(blockClone);
        await updateBlockPositions(pageId, blockClone);
    };

    useEffect(() => {
        displaycontent(id, setContent, recalculatePositions)
    }, [id]);
    return (
        <div className=" max-w-4xl mx-auto mt-4 px-5">
            <div className=" px-4 py-2 text-black flex items-center justify-between mb-5">
                <h2 className="text-5xl font-medium text-primary-title">Aperçu de contenu</h2>
                <button
                    className={`flex items-center ${!openBlock ? "bg-gray-400" : "bg-bg-btn"}   shadow-md text-white px-4 py-2`}
                    onClick={submitContentBlock} disabled={!openBlock}
                >
                    <FaPlus className="mr-2" />  {" "} Enregistrer
                </button>
            </div>

            <div className="px-4 py-2 text-black ">
                <MenuContent handelBlockClick={handelBlockClick} />
            </div>

            <div className=" p-4">
                {((openBlock === "text") ||
                    (openBlock === "table") ||
                    (openBlock === "link") ||
                    (openBlock !== "image") ||
                    (openBlock === "charts") ||
                    (openBlock === "qasection") ||
                    (openBlock === "faqsection") ||
                    (openBlock === "stepsection"))}

                {openBlock === "text" && (
                    <TextEditor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        convertedContent={convertedContent}

                    />

                )}

                {openBlock === "image" && <UploadImage image={image} setImage={setImage} handleUpload={handleUpload}
                    handleChangePicture={handleImageChange} formPicture={formPicture}
                />}
                {openBlock === "table" && (
                    <TableEditor tableData={tableData} setTableData={setTableData} />
                )}
                {openBlock === "link" && (
                    <CreateLink formLink={formLink} handelChange={handleLinkChange} />
                )}
                {openBlock === "charts" && (
                    <HorizontalFlowWrapper setRfInstance={setRfInstance} />
                )}
                {openBlock === "qasection" && (
                    <div>
                        {questions.map((qa, index) => (
                            <div>
                                <CollapsibleQuestion key={index} index={index} question={qa.question} response={qa.response} handleQuestion={(e) => handleQuestionChange(e, index)}
                                    remove={() => removeQuestion(index)}
                                />
                            </div>
                        ))}
                        <div className="flex justify-end">
                            <button onClick={addQuestion} className="mt-4 p-2 bg-[#00a2d6] text-white">Add Question</button>
                        </div>
                    </div>
                )}

                {openBlock === "stepsection" && (
                    <StepsSectionEditor
                        steps={steps}
                        setSteps={setSteps}
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                    />
                )}
                {openBlock === "faqsection" && (
                    <div className=" w-11/12 mx-auto border rounded-md p-4">
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
                    </div>
                )}
            </div>
            <div className="px-4 py-2">
                {content ? (
                    content.map((item) => (
                        <ListContent
                            key={item._id}
                            blocks={item}
                            onDelete={handelDelete}
                            onEdit={() => handleEdit(item)}
                            draggable
                            onDragStart={() => (dragBlock.current = item.position)}
                            onDragEnter={() => (dragOverBlock.current = item.position)}
                            onDragEnd={handelSort}
                            onDragOver={(e) => e.preventDefault()}
                            handleSaveEdit={handleSave}
                        />
                    ))
                ) : (
                    <h2>No content fo the moment</h2>
                )}
            </div>
        </div>
    );
};

export default PreviewContent;
