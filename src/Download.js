import React from 'react';
import './App.css';
import { Panel, useReactFlow, getRectOfNodes, getTransformForBounds } from 'reactflow';
import { toPng } from 'html-to-image';

function downloadImage(dataUrl) {
    const a = document.createElement('a');
    a.setAttribute('download', 'reactflow.png');
    a.setAttribute('href', dataUrl);
    a.click();
}

const imageWidth = 2024;
const imageHeight = 768;

function DownloadButton() {
    const { getNodes } = useReactFlow();

    const onClick = () => {

        const nodesBounds = getRectOfNodes(getNodes());
        const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);

        toPng(document.querySelector('.react-flow__viewport'), {
            backgroundColor: 'rgb(255,255,255)',
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
        <Panel position="top-left">
            <button className="download-btn" onClick={onClick}>
                Download
            </button>
        </Panel>
    );
}
export default DownloadButton;
