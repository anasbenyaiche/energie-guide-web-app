import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import TextEditor from '../components/ContentBlocks/TextEditor'
import axios from 'axios';
import TableEditor from '../components/ContentBlocks/TableEditor';
import convertTable from '../utils/convertTable';
import { Link, useParams } from 'react-router-dom';
import CreateLink from '../components/ContentBlocks/CreateLink';
import createLinkHTML from '../components/ContentBlocks/createLinkHTML';
import UploadImage from '../components/ContentBlocks/UploadImage';


const CreateContent = () => {
    const { id } = useParams()
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [convertedContent, setConvertedContent] = useState('');
    const [selected, setSelcted] = useState('Text')
    const [position, setPosition] = useState(() => {
        const savedPostion = localStorage.getItem('position');
        return savedPostion ? parseInt(savedPostion, 10) : 1;
    })
    const [tableData, setTableData] = useState([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]);
    useEffect(() => {
        localStorage.setItem('position', position);
    }, [position])

    const handelChange = (e) => {
        console.log(e.target.value)
        setSelcted(e.target.value)
    }

    const [formLink, setFormLink] = useState({
        link: '',
        title: '',
    })

    const handleLinkChange = (e) => {
        const { name, value } = e.target
        setFormLink({ ...formLink, [name]: value })
    }

    const handelSubmit = async () => {
        let contentblock = {};

        if (selected === 'Text') {
            contentblock = {
                type: selected.toLowerCase(),
                content: convertedContent,
                position: position
            };
        }
        else if (selected === 'Table') {
            contentblock = {
                type: selected.toLowerCase(),
                content: convertTable(tableData),
                position: position
            }
        }
        else if (selected === 'Link') {
            contentblock = {
                type: selected.toLowerCase(),
                content: createLinkHTML(formLink.link, formLink.title),
                position: position
            };
        }
        const token = localStorage.getItem('token');
        try {
            const endPoint =
                process.env.NODE_ENV === "development"
                    ? "http://localhost:5000/api/"
                    : "https://energie-guide-web-app.vercel.app/api";


            const response = await axios.post(`${endPoint}pages/${id}/blocks`, contentblock, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPosition(prevpostion => prevpostion + 1)
            setConvertedContent('')
            setEditorState(EditorState.createEmpty());
            setFormLink({ link: '', title: '' });
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

    const isContentEmpty = () => {
        if (selected === 'text') {
            return !convertedContent.trim();
        }
        else if (selected === 'Table') {
            return tableData.every((row) => row.every((cell) => !cell.trim()));
        } else if (selected === 'Link') {
            return !formLink.link.trim() || !formLink.title.trim();
        }
        return true;
    };


    return (
        <div className=' max-w-7xl my-8 mx-auto'>
            <div className=' px-6 flex items-center justify-between'>
                <h1 className='text-2xl font-semibold text-black'>Content settings</h1>
                <div className=' flex justify-center gap-4'>
                    <Link className='bg-[#00a2d6] border rounded-md border-[#00a2d6] focus:outline-none text-white px-5 py-2 hover:border-[#00a2d6]'
                        to={`/admin/blocks/${id}`} target='_blank' >Preview</Link>
                    <button className={`bg-[#00a2d6] border border-[#00a2d6] focus:outline-none text-white px-5 py-2 hover:border-[#00a2d6]`}

                        onClick={handelSubmit}> Save</button>
                </div>

            </div>
            <div className=' bg-white shadow-md p-4 mt-5 rounded-md'>
                <div className=' flex items-start mt-5  gap-5'>
                    <div className=' p-2 w-1/3'>
                        <h2 className=' text-xl font-semibold text-black'>General Settings</h2>
                        <p className='text-black'>Customize the general settings of your Content section.
                            You can create and save specific Content.</p>
                        <h3 className=' mb-4 text-lg mt-4  font-medium'>Type of Content </h3>
                        <select className='w-full block mb-2 p-2 rounded-md bg-white text-black
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
                        {selected == "Image" ? <UploadImage /> : ""}
                        {selected == "Charts" ? <h2>Charts</h2> : ""}
                        {selected == "Table" ? <TableEditor
                            tableData={tableData}
                            setTableData={setTableData}

                        /> : ""}
                        {selected == "Link" ? <CreateLink formLink={formLink} handelChange={handleLinkChange} /> : ""}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateContent
