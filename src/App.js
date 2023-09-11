import { useState, useCallback, useEffect, useRef } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MiniMap,
  useReactFlow,
  Panel,
  updateEdge
} from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';
import customNodes from './customNodes';
import resizeNode from "./resizeNode"
import CustomEdge from './customEdges';
import image1 from './images/ClinicalSite.png';
import image2 from './images/Diagnostics.png';
import image3 from './images/Dietitian.png';
import image4 from './images/Pharmacy.png';
import POP from './POP';
import { createStore } from 'zustand';
import DownloadButton from './Download'

let nodeTypes = {
  custom: customNodes,
  resize: resizeNode
};
let edgeTypes = {
  custom: CustomEdge,
}

const initialNodes = [
  {
    id: '1',
    data: {
      label:
        // <div style={{ height: "130px", width: "100px", boxSizing: 'border-box', zIndex: 1999 }} >
        <img
          value={'Satyam'}
          style={{
            height: '100%',
            width: '100%',
            objectFit: "cover",
            objectPosition: "center",
            verticalAlign: "middle",
          }}
          src={image1}
          alt='img'
        />
      // </div>
      ,
    },
    json: {
      "id": 1,
      "title": "iPhone Galaxy +1", // only title was updated
      "description": "An apple mobile which is nothing like apple",
      "price": 549,
      "discountPercentage": 12.96,
      "rating": 4.69,
      "stock": 94,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "...",
      "images": ["...", "...", "..."]
    },
    position: { x: 90, y: 60 },
    type: 'custom',
    deletable: false
  },
  {
    id: '2',
    data: {
      label:
        // <div style={{ height: "130px", width: "100px", boxSizing: 'border-box', zIndex: 1999 }} >
        <img style={{
          height: '100%',
          width: '100%',
          objectFit: "cover",
          objectPosition: "center",
          verticalAlign: "middle",
        }} src={image2} alt='img' />
      // </div>
    },
    position: { x: 90, y: 210 },
    type: 'custom',
    deletable: false
  },
  {
    id: '3',
    data: {
      label:
        //  <div  >
        <img style={{
          height: '100%',
          width: '100%',
          objectFit: "cover",
          objectPosition: "center",
          verticalAlign: "middle",
        }} src={image3} alt='img' />
      // </div>
    },
    position: { x: 90, y: 360 },
    type: 'custom',
    deletable: false
  },
  {
    id: '4',
    data: {
      label:
        // <div style={{ height: "100%", width: "100%", boxSizing: 'border-box', }} >
        <img style={{
          height: '100%',
          width: '100%',
          objectFit: "cover",
          objectPosition: "center",
          verticalAlign: "middle",
          position: 'relativess'
        }} src={image4} alt='img' />
      // {/* </div> */}
    },
    position: { x: 90, y: 510 },
    type: 'custom',
    deletable: false
  },
  // {
  //   id: "5",
  //   type: "resize",
  //   data: { label: "ResizerNode" },
  //   position: { x: 200, y: 300 },
  //   style: {
  //     background: "#fff",
  //     fontSize: 12,
  //     border: "1px solid black",
  //     padding: 5,
  //     borderRadius: 15,
  //     height: 100
  //   }
  // }
];

const initialEdges = [
  // {
  //   id: '1->2',
  //   source: '1',
  //   target: '2',
  //   label: 'default arrow',
  // }
];

function Flow() {
  const updateEdgeflag = useRef(true);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [prevCounter, setOnConnectCounter] = useState(0);
  // const [Mflag, setMflag] = useState(false);

  // this line is use to add the label when two node are connected

  useEffect(() => {
    setEdges((edges) => edges.map((obj) => ({ ...obj, type: "custom", data: { label: 'Text' } })));
  }, [prevCounter]);

  useEffect(() => {
    // let count = 1;
    edges.map((obj) => {
      console.log(obj.id)
      // count = count + 1
      // alert("edge count", count)
    })
    console.log(`edge array ${edges.length}`, edges);

  }, [prevCounter])

  const onNodesChange = useCallback(
    (changes) => setNodes((n) => applyNodeChanges(changes, n)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((e) => applyEdgeChanges(changes, e)),
    []
  );

  const onConnect = useCallback((params) => {
    setEdges((prevEdges) => addEdge(params, prevEdges));
    setOnConnectCounter((prevCounter) => prevCounter + 0.1);
  }, []);


  const onEdgeUpdateStart = useCallback(() => {
    updateEdgeflag.current = false;
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!updateEdgeflag.current) {
      console.log("edg in the onEdgeUpdateEnd", edge)
      setEdges((eds) => eds.filter((a) => edge.id !== a.id));
    }
    updateEdgeflag.current = true;
    setOnConnectCounter((prevCounter) => prevCounter + 0.1);
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      setOnConnectCounter((prevCounter) => prevCounter + 0.1);
      setEdges((els) => updateEdge(oldEdge, newConnection, els))
    },
    []
  );
  // const onEdgeClick = useCallback((_, edge) => {
  //   console.log(edge)
  // })
  // const onEdgeDoubleClick = useCallback((_, edge) => {
  //   console.log("edge on double click", edge)
  //   alert("alert of the doubble click on the edge ", edge)
  // })

  // function onInteractiveChange(){}


  const handleMinimapNodeClick = (event, nodeId) => {
    event.preventDefault();
    console.log(nodeId);
    const a = JSON.stringify(nodeId);
    alert("miniMap Node Clicked")
    // Find the clicked node by ID
    const clickedNode = nodes.find(node => node.id === nodeId.id);

    console.log('Clicked Node Data:', clickedNode.json);

  };
  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        zoomOnDoubleClick={false}
        panOnScroll={false}
        selectionOnDrag={false}
        preventScrolling={false}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        onEdgeUpdate={onEdgeUpdate}
        minZoom={0.2}
        maxZoom={1}

      // defaultViewport={{ zoom: 1, x: -100, y: 0 }}
      // fitView
      // fitViewOptions={{ padding: 0.4 }}
      // fitView={Mflag}
      // onEdgeClick={onEdgeClick}
      // onEdgeDoubleClick={onEdgeDoubleClick}
      // connectionLineType={"smoothstep"}
      >
        <div style={{ width: "250px", height: "100%", border: "1px solid gray", marginLeft: "0px", background: "gray", opacity: "0.0" }}>
        </div>
        <Panel className='savebtn' position="bottom-right" onClick={() => {
          alert("Go for reload / refresh")
        }}>Save BTN</Panel>
        <Controls showZoom={false} showFitView={false} position={'top-right'} />
        <MiniMap zoomable={!false} pannable={!false} nodeColor={'lightgreen'} onNodeClick={handleMinimapNodeClick} zoomStep={10} />
        <Background id="1" gap={10} color="gray" variant={'dots'} />
        <DownloadButton />
      </ReactFlow>
    </div >

  );
}

export default Flow;
