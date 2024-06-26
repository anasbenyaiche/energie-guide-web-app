import React, { useCallback, useEffect, useRef, useState } from "react";
import ListContent from "../components/ContentBlocks/ListContent";
import EditTextEditor from "../components/ContentBlocks/EditTextEditor";
import Modal from "../components/Modal/Modal";
import EditTable from "../components/ContentBlocks/EditTable";
import { useParams } from "react-router-dom";
import EditLink from "../components/ContentBlocks/EditLink";
import { FaRegWindowClose } from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";
import { BsTable } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { FaTextHeight } from "react-icons/fa6";
import { FaLink } from "react-icons/fa6";
import TextEditor from "../components/ContentBlocks/TextEditor";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import TableEditor from "../components/ContentBlocks/TableEditor";
import CreateLink from "../components/ContentBlocks/CreateLink";
import UploadImage from "../components/ContentBlocks/UploadImage";
import createLinkHTML from "../components/ContentBlocks/createLinkHTML";
import DOMPurify from "dompurify";
import convertTable from "../utils/convertTable";
import PreviewFlow from "../components/ContentBlocks/PreviewFlow";
import { BsDiagram3 } from "react-icons/bs";
import HorizontalFlowWrapper from "../components/ContentBlocks/HorizontalFlow";
import api from "../api/api";
import EditUploadImage from "../components/ContentBlocks/EditUploadImage";
import useSaveBlock from "../hooks/useSaveBlock";
import useDeleteBlock from "../hooks/useDeleteBlock";
import useDisplayBlock from "../hooks/useDisplayBlock";


const PreviewContent = () => {
    const { pageId } = useParams();
    const id = pageId
    const [content, setContent] = useState([]);
    const { saveBlock, error: saveError } = useSaveBlock();
    const { deleteBlock, error: deleteError } = useDeleteBlock()
    const { displaycontent, error: displayError } = useDisplayBlock()
    const token = localStorage.getItem("token");
    const [selectedBlock, setSelectedBlock] = useState(null);
    const [openModal, setopenModal] = useState(false);
    const [openMenu, setopenMenu] = useState(false);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [image, setImage] = useState(null);
    const [convertedContent, setConvertedContent] = useState("");
    const [selected, setSelcted] = useState("text");
    const [position, setPosition] = useState(() => {
        const savedPostion = localStorage.getItem("position");
        return savedPostion ? parseInt(savedPostion, 10) : 1;
    });
    const [rfInstance, setRfInstance] = useState(null);
    const [flowData, setFlowData] = useState(null);
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

    const [formPicture, setFormPicture] = useState({
        title: ""
    })

    const handleImageChange = (e) => {
        const { name, value } = e.target;
        setFormPicture({ ...formPicture, [name]: value });
    }

    const handleLinkChange = (e) => {
        const { name, value } = e.target;
        setFormLink({ ...formLink, [name]: value });
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
        localStorage.setItem("position", position);
    }, [position]);

    useEffect(() => {
        const contentState = editorState.getCurrentContent();
        const html = convertToHTML(contentState);
        const sanitizedHtml = DOMPurify.sanitize(html);
        setConvertedContent(sanitizedHtml);
    }, [editorState]);

    const handelSubmit = useCallback(async () => {
        let contentblock = {};

        if (selected === "text") {
            contentblock = {
                type: selected.toLowerCase(),
                content: convertedContent,
                position: position,
            };
        } else if (selected === "table") {
            contentblock = {
                type: selected.toLowerCase(),
                content: convertTable(tableData),
                position: position,
            };
        } else if (selected === "link") {
            contentblock = {
                type: selected.toLowerCase(),
                content: createLinkHTML(formLink.link, formLink.title),
                position: position,
            };
        } else if (selected === "charts" && rfInstance) {
            const flow = rfInstance.toObject();
            contentblock = {
                type: selected.toLowerCase(),
                content: flow,
                position: position,
            };
        }
        try {

            const response = await api.post(
                `/pages/${id}/blocks`,
                contentblock,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPosition((prevpostion) => prevpostion + 1);
            setConvertedContent("");
            setEditorState(EditorState.createEmpty());
            setFormLink({ link: "", title: "" });
            setOpenBlock(false);
            console.log("Content Block Created:", response.data);
        } catch (error) {
            console.log("Error catched Block:", error);
        }
    }, [
        selected,
        convertedContent,
        tableData,
        formLink,
        rfInstance,
        position,
        id,
    ]);
    const handleUpload = async () => {
        if (!image) return;
        let contentblock = {}
        contentblock = {
            type: 'image',
            content: formPicture.title,
            position: position,
            page_id: id,
            image: image
        };
        try {
            const uploadResponse = await api.post(`/upload-image`, contentblock, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const uploadedImageUrl = uploadResponse.data.imageUrl;
            setOpenBlock(false);
            console.log('Image uploaded successfully:', uploadedImageUrl);

        } catch (error) {
            console.error('Error caught during upload:', error);
        }
    };

    const handelDelete = async (id) => {
        deleteBlock(id, setContent, content)
    };
    const handleEdit = (block) => {
        setSelectedBlock(block);
        setopenModal(true);
    };

    const handleSave = async (updatedBlock) => {
        saveBlock(updatedBlock, setContent, content);
        setopenModal(false)
    };

    const dragBlock = useRef(0);
    const dragOverBlock = useRef(0);

    const handelSort = async () => {
        const blockClone = [...content];
        const temp = blockClone[dragBlock.current];
        blockClone[dragBlock.current] = blockClone[dragOverBlock.current];
        blockClone[dragOverBlock.current] = temp;
        recalculatePositions(blockClone);
        await updateContentBlockPositions(blockClone);
    };

    const updateContentBlockPositions = async (blocks) => {
        try {
            await api.put(`/pages/${id}/reorder-blocks`, { blocks });
            console.log("Content block positions updated successfully");
            console.log("blocs updated", blocks)
        } catch (error) {
            console.log("Error updating content block positions:", error);
        }
    };


    useEffect(() => {
        displaycontent(id, setContent, recalculatePositions)
    }, [id]);
    console.log("content", content);


    return (
        <div className=" max-w-7xl my-8 mx-auto">
            <div className=" px-4 py-2 text-black flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Preview Content</h1>
                <button
                    className=" p-0 text-end focus:outline-none border-none bg-transparent text-[#00a2d6] text-3xl"
                    onClick={() => setopenMenu(!openMenu)}
                >
                    {openMenu ? <FaRegWindowClose /> : <FaRegSquarePlus />}
                </button>
            </div>

            {openMenu && (
                <div className="px-4 py-2 text-black ">
                    <div className=" shadow-md flex p-4 items-center justify-start gap-6">
                        <div
                            className=" text-center cursor-pointer"
                            onClick={() => handelBlockClick("text")}
                        >
                            <FaTextHeight className=" text-3xl mb-2 text-center" />
                            <h2 className=" text-black text-xl">Text</h2>
                        </div>
                        <div
                            className=" text-center cursor-pointer"
                            onClick={() => handelBlockClick("image")}
                        >
                            <CiImageOn className=" text-3xl mb-2 text-center" />
                            <h2 className=" text-black text-xl">Image</h2>
                        </div>
                        <div
                            className=" text-center cursor-pointer"
                            onClick={() => handelBlockClick("table")}
                        >
                            <BsTable className=" text-3xl mb-2 text-center" />
                            <h2 className=" text-black text-xl">Table</h2>
                        </div>
                        <div
                            className=" text-center cursor-pointer"
                            onClick={() => handelBlockClick("link")}
                        >
                            <FaLink className=" text-3xl mb-2 text-center" />
                            <h2 className=" text-black text-xl">Link</h2>
                        </div>
                        <div
                            className=" text-center cursor-pointer"
                            onClick={() => handelBlockClick("charts")}
                        >
                            <BsDiagram3 className=" text-3xl mb-2 text-center" />
                            <h2 className=" text-black text-xl">Diagramme</h2>
                        </div>
                    </div>
                </div>
            )}

            <div className=" p-4">
                {((openMenu && openBlock === "text") ||
                    (openMenu && openBlock === "table") ||
                    (openMenu && openBlock === "link") ||
                    (openMenu && openBlock !== "image") ||
                    (openMenu && openBlock === "charts")) && (
                        <div className=" mb-5 flex justify-end gap-4">
                            <button
                                className={`bg-[#00a2d6] border border-[#00a2d6] focus:outline-none text-white px-5 py-2 hover:border-[#00a2d6]`}
                                onClick={handelSubmit}
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
                    />
                )}
                {selectedBlock?.type === "table" && (
                    <EditTable
                        block={selectedBlock}
                        onSave={handleSave}
                    />
                )}
                {selectedBlock?.type === "link" && (
                    <EditLink
                        block={selectedBlock}
                        onSave={handleSave}
                    />
                )}
                {selectedBlock?.type === "charts" && (
                    <PreviewFlow
                        nodesData={flowData.nodes}
                        edgesData={flowData.edges}
                        viewportData={flowData.viewport}
                    />
                )}
                {selectedBlock?.type === "image" && (
                    <EditUploadImage
                        block={selectedBlock}
                        setImage={setImage}
                        handleUpload={handleUpload}
                    />
                )}
            </Modal>
        </div>
    );
};

export default PreviewContent;
