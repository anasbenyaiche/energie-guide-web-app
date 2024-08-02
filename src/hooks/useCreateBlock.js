import { useCallback, useEffect } from "react";
import { EditorState, convertToRaw } from "draft-js";
import api from "../api/api"
import convertTable from "../utils/convertTable";
import createLinkHTML from "../components/ContentBlocks/createLinkHTML";
import { stateToHTML } from 'draft-js-export-html';
import DOMPurify from "dompurify";
import blockStyleFn from "../utils/blockStyleFn";
import styleToHTML from "../utils/styleToHTML";
import { sections } from "../utils/sectionsData";


const useCreateBlock = ({
    selected,
    convertedContent,
    convertstepText,
    editorState,
    tableData,
    formLink,
    questions,
    rfInstance,
    position,
    sectionData,
    steps,
    id,
    setPosition,
    setConvertedContent,
    setConvertstepText,
    setEditorState,
    setFormLink,
    setQuestions,
    setSectionData,
    setOpenBlock,
}) => {
    useEffect(() => {
        localStorage.setItem("position", position);
    }, [position]);

    const logInlineStyles = (contentState) => {
        const rawContent = convertToRaw(contentState);
        console.log("Raw Content State:", rawContent);

        rawContent.blocks.forEach(block => {
            block.inlineStyleRanges.forEach(range => {
                console.log("Inline Style:", range.style);
            });
        });
    };


    const submitContentBlock = useCallback(async () => {
        let contentblock = {};

        if (selected === "text") {
            const contentState = editorState.getCurrentContent();
            const rawContentState = convertToRaw(contentState);
            const contentHTML = stateToHTML(contentState);
            const sanitizedHtml = DOMPurify.sanitize(contentHTML);
            setConvertedContent(sanitizedHtml);
            contentblock = {
                type: selected.toLowerCase(),
                content: rawContentState,
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
        }
        else if (selected === "qasection") {
            contentblock = {
                type: selected.toLowerCase(),
                content: JSON.stringify(questions),
                position: position,
            };
        }
        else if (selected === "faqsection") {
            contentblock = {
                type: selected.toLowerCase(),
                content: JSON.stringify(sectionData),
                position: position,
            };
        }
        else if (selected === "charts" && rfInstance) {
            const flow = rfInstance.toObject();
            contentblock = {
                type: selected.toLowerCase(),
                content: flow,
                position: position,
            };
        }

        else if (selected === "stepsection") {

            // const contentState = editorState.getCurrentContent();
            // const html = stateToHTML(contentState, {
            //     blockStyleFn,
            //     styleToHTML,
            // });
            const contentState = editorState.getCurrentContent();
            const rawContentState = convertToRaw(contentState);
            const contentHTML = stateToHTML(contentState);
            const sanitizedHtml = DOMPurify.sanitize(contentHTML);
            setConvertstepText(sanitizedHtml);
            const dataStep = {
                text: rawContentState,
                steps: steps
            };
            contentblock = {
                type: selected.toLowerCase(),
                content: JSON.stringify(dataStep),
                position: position,
            };
            console.log(dataStep)
        }


        try {

            const response = await api.post(`/pages/${id}/blocks`, contentblock,);
            setPosition((prevpostion) => prevpostion + 1);
            setConvertedContent("");
            setConvertstepText("")
            setEditorState(EditorState.createEmpty());
            setFormLink({ link: "", title: "" });
            setQuestions([{ question: "", response: "" }]);
            setSectionData(sections)
            setOpenBlock(false);
            console.log("Content Block Created:", response.data);
        } catch (error) {
            console.log("Error catched Block:", error);
        }
    }, [
        selected,
        convertedContent,
        convertstepText,
        setConvertedContent,
        setConvertstepText,
        tableData,
        editorState,
        questions,
        sectionData,
        formLink,
        steps,
        rfInstance,
        position,
        id,
    ]);

    return { submitContentBlock }
}

export default useCreateBlock
