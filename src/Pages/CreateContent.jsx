import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import TextEditor from '../components/ContentBlocks/TextEditor'
import axios from 'axios';

const CreateContent = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [convertedContent, setConvertedContent] = useState('');
    const [selected, setSelcted] = useState('Text')
    const [position, setPosition] = useState(() => {
        const savedPostion = localStorage.getItem('position');
        return savedPostion ? parseInt(savedPostion, 10) : 1;
    })

    useEffect(() => {
        localStorage.setItem('position', position);
    }, [position])
    const handelChange = (e) => {
        console.log(e.target.value)
        setSelcted(e.target.value)
    }

    const handelSubmit = async () => {
        const contentblock = {
            type: selected.toLocaleLowerCase(),
            content: convertedContent,
            position: position
        };
        const token = localStorage.getItem('token');
        try {
            const endPoint =
                process.env.NODE_ENV === "development"
                    ? "http://localhost:5000/api/"
                    : "https://energie-guide-web-app.vercel.app/api";


            const response = await axios.post(`${endPoint}pages/6655ac8de8c07edccd0b2cb1/blocks`, contentblock, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPosition(prevpostion => prevpostion + 1)
            setConvertedContent('')
            setEditorState(EditorState.createEmpty());

            console.log('Content Block Created:', response.data);
        } catch (error) {

            console.log('Error catched Block:', error)

        }
    }



    useEffect(() => {
        const contentState = editorState.getCurrentContent();
        const html = convertToHTML(contentState);
        const sanitizedHtml = DOMPurify.sanitize(html);
        setConvertedContent(sanitizedHtml);
    }, [editorState]);

    return (
        <div className=' max-w-7xl my-8 mx-auto'>
            <div className=' flex items-center justify-between'>
                <h1 className='text-2xl font-semibold'>Content settings</h1>
                <button onClick={handelSubmit}> Save</button>
            </div>
            <div className=' bg-white shadow-md p-4 mt-5 rounded-md'>
                <div className=' flex items-start mt-5  gap-5'>
                    <div className=' p-2 w-1/3'>
                        <h2 className=' text-xl font-semibold'>General Settings</h2>
                        <p>Customize the general settings of your Content section.
                            You can create and save specific Content.</p>
                        <h3 className=' mb-4 text-lg mt-4  font-medium'>Type of Content </h3>
                        <select className='w-full block mb-2 p-2 rounded-md
                         border-gray-400 text-sm font-medium border focus-visible:outline-none' value={selected} onChange={handelChange}>
                            <option>Text </option>
                            <option>Image</option>
                            <option>Charts</option>
                            <option>Table</option>
                            <option>Link</option>
                        </select>
                    </div>
                    <div className=' w-[70%]'>
                        {selected == "Text" ? <TextEditor
                            editorState={editorState}
                            onEditorStateChange={setEditorState}
                            convertedContent={convertedContent}
                        /> : ""}
                        {selected == "Image" ? <h2>Image</h2> : ""}
                        {selected == "Charts" ? <h2>Charts</h2> : ""}
                        {selected == "Table" ? <h2>Table</h2> : ""}
                        {selected == "Link" ? <h2>Link</h2> : ""}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateContent
