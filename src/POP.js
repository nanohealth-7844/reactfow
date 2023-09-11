// import React from 'react'
// import './POP.css';
// const POP = ({ data, setPopUp }) => {
//     // console.log("Im in POP component");
//     return (
//         <div className='container'>
//             <div className='mainContainer'>
//                 <h3 style={{ display: "inline-block", margin: '0px', marginBottm: '5px', width: '82%' }}>   All the data  of this node</h3>
//                 <button className='closeBtn' onClick={() => {
//                     setPopUp(false);
//                     // console.log("button clicked");
//                 }}>Close</button>
//                 <br></br> {JSON.stringify(data.label)}
//             </div>
//         </div>
//     )
// }
// export default POP;

import React, { useMemo } from 'react';
import './POP.css';

const POP = ({ data, setPopUp }) => {
    return (
        <div className='container'>
            <div className='mainContainer'>
                <h3 style={{ display: "inline-block", margin: '0px', marginBottom: '5px', width: '82%' }}>All the data of this node</h3>
                <button className='closeBtn' onClick={() => {
                    setPopUp(false);
                    // console.log("button clicked");
                }}>Close</button>
                <br></br>
                {/* {JSON.stringify(data.label)} */}
                <iframe style={{ position: "relative", height: "90%", width: "100%" }} width="auto" height="auto" src="https://www.youtube.com/embed/5VtzykXBzBU" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
            </div>
        </div>
    )
}

export default React.memo(POP);
