import React, { useCallback, useEffect, useRef, useState } from "react";
import ListContent from "../components/ContentBlocks/ListContent";
import EditTextEditor from "../components/ContentBlocks/EditTextEditor";
import Modal from "../components/Modal/Modal";
import EditTable from "../components/ContentBlocks/EditTable";
import { useParams } from "react-router-dom";
import EditLink from "../components/ContentBlocks/EditLink";
import TextEditor from "../components/ContentBlocks/TextEditor";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { stateToHTML } from 'draft-js-export-html';
import TableEditor from "../components/ContentBlocks/TableEditor";
import CreateLink from "../components/ContentBlocks/CreateLink";
import UploadImage from "../components/ContentBlocks/UploadImage";
import DOMPurify from "dompurify";
import HorizontalFlowWrapper from "../components/ContentBlocks/HorizontalFlow";
import EditUploadImage from "../components/ContentBlocks/EditUploadImage";
import useSaveBlock from "../hooks/useSaveBlock";
import useDeleteBlock from "../hooks/useDeleteBlock";
import useDisplayBlock from "../hooks/useDisplayBlock";
import useCreateBlock from "../hooks/useCreateBlock";
import useUpdateBlock from "../hooks/useUpdateBlock";
import useUploadPicture from "../hooks/useUploadPicture";
import MenuContent from "../components/ContentBlocks/MenuContent";
import EditFlowWrapper from "../components/ContentBlocks/EditFLow";
import CollapsibleQuestion from "../components/ContentBlocks/CollapsibleQuestion";
import EditCollapsible from "../components/ContentBlocks/EditCollapsible";
import { IoAddOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import LeftSidebar from "../components/LeftSidebar";
import DraftEditor from "../components/ContentBlocks/DraftEditor";
import blockStyleFn from "../utils/blockStyleFn";
import StepsSectionEditor from "../components/ContentBlocks/PreviewStep/StepsSectionEditor";
import EditStep from "../components/ContentBlocks/PreviewStep/EditStep";

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
    const [openModal, setopenModal] = useState(false);
    const [openMenu, setopenMenu] = useState(false);
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
    const [isOpen, setIsopen] = useState(false);
    const [formLink, setFormLink] = useState({
        link: "",
        title: "",
    });

    const [questions, setQuestions] = useState([
        { question: "", response: "", }
    ]);


    const [formPicture, setFormPicture] = useState({
        title: ""
    })
    const [contentBlocks, setContentBlocks] = useState([]);


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
        tableData,
        formLink,
        questions,
        rfInstance,
        steps,
        position,
        id: pageId,
        setPosition,
        setConvertedContent,
        setEditorState,
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
        if (block?.type === 'qasection' || block?.type === 'stepsection') {
            setIsopen(true)
            setopenModal(false)
        } else {
            setopenModal(true);
            setIsopen(false)
        }


    };

    const handleSave = async (updatedBlock) => {
        saveBlock(updatedBlock, setContent, content);
        setopenModal(false)
        setIsopen(false)
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
    console.log(content)

    return (
        <div className=" max-w-7xl my-8 mx-auto">
            <div className=" px-4 py-2 text-black flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Preview Content</h1>
                <button
                    className=" p-0 text-end focus:outline-none border-none bg-transparent text-[#00a2d6] text-3xl"
                    onClick={() => setopenMenu(!openMenu)}
                >
                    {openMenu ? <IoCloseOutline /> : <IoAddOutline />}
                </button>
            </div>

            {openMenu && (
                <div className="px-4 py-2 text-black ">
                    <MenuContent handelBlockClick={handelBlockClick} />
                </div>
            )}

            <div className=" p-4">
                {((openMenu && openBlock === "text") ||
                    (openMenu && openBlock === "table") ||
                    (openMenu && openBlock === "link") ||
                    (openMenu && openBlock !== "image") ||
                    (openMenu && openBlock === "charts") ||
                    (openMenu && openBlock === "qasection") ||
                    (openMenu && openBlock === "stepsection")) && (
                        <div className=" mb-5 flex justify-end gap-4">
                            <button
                                className={`bg-[#00a2d6] border border-[#00a2d6] focus:outline-none text-white px-5 py-2 hover:border-[#00a2d6]`}
                                onClick={submitContentBlock}
                            >
                                {" "}
                                Save
                            </button>
                        </div>
                    )}

                {openMenu && openBlock === "text" && (
                    <TextEditor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        convertedContent={convertedContent}

                    />

                )}

                {openMenu && openBlock === "image" && <UploadImage image={image} setImage={setImage} handleUpload={handleUpload}
                    handleChangePicture={handleImageChange} formPicture={formPicture}
                />}
                {openMenu && openBlock === "table" && (
                    <TableEditor tableData={tableData} setTableData={setTableData} />
                )}
                {openMenu && openBlock === "link" && (
                    <CreateLink formLink={formLink} handelChange={handleLinkChange} />
                )}
                {openMenu && openBlock === "charts" && (
                    <HorizontalFlowWrapper setRfInstance={setRfInstance} />
                )}
                {openMenu && openBlock === "qasection" && (
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

                {openMenu && openBlock === "stepsection" && (
                    <StepsSectionEditor
                        steps={steps}
                        setSteps={setSteps}
                        editorState={editorState}
                        onEditorStateChange={setEditorState}

                    />
                )}
            </div>
            <div className=" bg-white shadow-md p-4 mt-5 rounded-md">
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
                        />
                    ))
                ) : (
                    <h2>No content fo the moment</h2>
                )}
            </div>
            <Modal open={openModal} onClose={() => setopenModal(false)}>
                {selectedBlock?.type === "text" && (
                    <EditTextEditor
                        block={selectedBlock}
                        onSave={handleSave}
                        onClose={() => setopenModal(false)}
                    />
                )}
                {selectedBlock?.type === "table" && (
                    <EditTable
                        block={selectedBlock}
                        onSave={handleSave}
                        onClose={() => setopenModal(false)}
                    />
                )}
                {selectedBlock?.type === "link" && (
                    <EditLink
                        block={selectedBlock}
                        onSave={handleSave}
                        onClose={() => setopenModal(false)}
                    />
                )}
                {selectedBlock?.type === "image" && (
                    <EditUploadImage
                        block={selectedBlock}
                        setImage={setImage}
                        handleUpload={handleUpload}
                        handleChangePicture={handleImageChange}
                        formPicture={formPicture}
                    />
                )}
            </Modal>
            <LeftSidebar isOpen={isOpen} onClose={() => setIsopen(false)}>
                {selectedBlock?.type === "qasection" && (
                    <EditCollapsible
                        block={selectedBlock}
                        onSave={handleSave}
                        onClose={() => setIsopen(false)}
                    />

                )}
                {selectedNode?.type === "charts" && (
                    <EditFlowWrapper
                        block={selectedNode}
                        onSave={handleSave}
                        onClose={() => setopenModal(false)}
                    />
                )}
                {selectedBlock?.type === "stepsection" && (
                    <EditStep
                        block={selectedBlock}
                        onSave={handleSave}
                        onClose={() => setIsopen(false)}
                    />
                )}
            </LeftSidebar>
        </div>
    );
};

export default PreviewContent;
