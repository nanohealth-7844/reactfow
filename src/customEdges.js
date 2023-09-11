import React from "react";
import {
    getBezierPath,
    EdgeLabelRenderer,
    BaseEdge,
    NodeResizeControl,
} from "reactflow";

const CustomEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data
}) => {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition
    });

    return (
        <>
            <BaseEdge id={id} path={edgePath} />
            {data && data.label && (
                <>
                    <EdgeLabelRenderer >
                        <div
                            style={{
                                position: "absolute",
                                transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                                background: "yellow",
                                padding: 10,
                                borderRadius: 5,
                                fontSize: 12,
                                fontWeight: 700,
                                border: '1px solid gray'
                            }}
                            className="abcdefgh"
                            onMouseOver={() => console.log("mouseOver")}
                            onMouseOut={() => console.log("MouseOut")}
                        // className="nodrag nopan"
                        >
                            {data.label}
                        </div>
                    </EdgeLabelRenderer>
                </>
            )}
        </>
    );
};

export default CustomEdge;
