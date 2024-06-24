import { useCallback, useEffect } from "react";
import { EditorState } from "draft-js";
import api from "../api/api"
import convertTable from "../utils/convertTable";
import createLinkHTML from "../components/ContentBlocks/createLinkHTML";


const useCreateBlock = ({
    selected,
    convertedContent,
    tableData,
    formLink,
    rfInstance,
    position,
    id,
    setPosition,
    setConvertedContent,
    setEditorState,
    setFormLink,
    setOpenBlock,
}) => {
    useEffect(() => {
        localStorage.setItem("position", position);
    }, [position]);
    const submitContentBlock = useCallback(async () => {
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

            const response = await api.post(`/pages/${id}/blocks`, contentblock,);
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

    return { submitContentBlock }
}

export default useCreateBlock
