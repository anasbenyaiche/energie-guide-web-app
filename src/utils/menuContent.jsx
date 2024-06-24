import { FaTextHeight } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
import { BsTable } from "react-icons/bs";
import { FaLink } from "react-icons/fa6";
import { BsDiagram3 } from "react-icons/bs";

const menu = [
    {
        title: 'Text',
        icone: <FaTextHeight className="text-3xl mb-2 text-center" />
    },
    {
        title: "Image",
        icone: <CiImageOn className=" text-3xl mb-2 text-center" />
    },
    {
        title: 'Table',
        icone: <BsTable className=" text-3xl mb-2 text-center" />
    },
    {
        title: 'Link',
        icone: <FaLink className=" text-3xl mb-2 text-center" />
    },
    {
        title: 'Charts',
        icone: <BsDiagram3 className=" text-3xl mb-2 text-center" />
    }
]

export default menu