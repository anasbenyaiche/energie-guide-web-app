import React from 'react';
import { Panel, useReactFlow, getRectOfNodes, getTransformForBounds } from 'reactflow';
import { toPng } from 'html-to-image';

function downloadImage(dataUrl) {
    const a = document.createElement('a');

    a.setAttribute('download', 'diagramme.png');
    a.setAttribute('href', dataUrl);
    a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

function DownloadButton() {
    const { getNodes } = useReactFlow();
    const onClick = () => {
        const nodesBounds = getRectOfNodes(getNodes());
        const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);

        toPng(document.querySelector('.react-flow__viewport'), {
            backgroundColor: '#ffffff',
            width: imageWidth,
            height: imageHeight,
            style: {
                width: imageWidth,
                height: imageHeight,
                transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
            },
        }).then(downloadImage);
    };

    return (
        <Panel position="top-right">
            <div className='mb-10'>
                <button className='bg-[#00a2d6] text-end border rounded-md mt-4 mb-10
           border-[#00a2d6] focus:outline-none
            text-white px-5 py-2 hover:border-[#00a2d6]' onClick={onClick}>
                    Download Diagramme
                </button>
            </div>
        </Panel>
    );
}

export default DownloadButton;
