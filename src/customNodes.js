import { memo, useState } from 'react';
import { Handle, Position, NodeToolbar, NodeResizeControl } from 'reactflow';
import './customNodes.css';
import POP from './POP';

const controlStyle = {
    background: "transparent",
    border: "none"
};

const CustomNode = ({ data }) => {
    const [popUp, setPopUp] = useState(false);
    const [hover, setHover] = useState(false);
    const [rezise, setResize] = useState("130px");

    return (
        <div style={{ height: rezise, }}> {hover && !popUp && <div style={{ position: 'absolute', left: '-7px', top: '-24px', textAlign: 'center', border: '1px dashed gray', fontWeight: 'bolder', width: '120px' }}><span style={{ fontSize: '14px' }}>Show on Hover</span></div>}
            <NodeResizeControl style={controlStyle} minWidth={0} minHeight={0} >
                <span onMouseDownCapture={() => setResize("100%")}><ResizeIcon /></span>
            </NodeResizeControl>
            <div onClick={(e) => {
                if (e.detail === 2) {
                    setPopUp(true)
                    setHover(false)
                }
            }}
                onMouseOver={() => {
                    setHover(true)
                }}
                onMouseOut={() => {
                    setHover(false);
                }}
                style={{ position: "relative", height: '100%', width: "100%" }}
            >
                {popUp && <POP data={data} setPopUp={setPopUp} />}
                {/* <NodeToolbar position={data.toolbarPosition}>
                     <button style={{ zIndex: 10000 }} onClick={() => {
                        setPopUp(!popUp)
                        console.log("data on info button", data)
                        console.log("window:", window.location)
                        window.location.href = 'https://customer.nanohealthplan.com/'
                        window.open('https://customer.nanohealthplan.com/', '_blank');
                    }}>Info</button> 
            </NodeToolbar> */}
                {data.label}
                <Handle type="target" position={Position.Left} />
                <Handle type="source" position={Position.Right} />
            </div>
        </div >
    );
};

function ResizeIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="red"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: 'absolute', right: -1, bottom: -4 }}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="16 20 20 20 20 16" />
            <line x1="14" y1="14" x2="20" y2="20" />
            <polyline points="8 4 4 4 4 8" />
            <line x1="4" y1="4" x2="10" y2="10" />
        </svg>
    );
}

export default memo(CustomNode);
