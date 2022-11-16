import React, { FC, useState } from 'react';
import { EdgeProps, getBezierPath, EdgeLabelRenderer } from 'reactflow';

const EdgeLabel: FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });


  const [clicked, setClicked] = useState(false);
  return (
      <>
          {/* {`${!open && "hidden"} origin-left duration-200`} */}
          <path id={id}
              className={`${clicked && "stroke-pink-500"} react-flow__edge-path hover:stroke-emerald-500 `}
              d={edgePath} onDoubleClick={() => setClicked(!clicked)} />

          <EdgeLabelRenderer >
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: '#ffcc00',
            padding: 10,
            borderRadius: 5,
            fontSize: 8,
            fontWeight: 700,
          }}
          className="nodrag nopan"
        >
                  {data.text}
                  {/* <input
          id="text"
          name="text"
          placeholder="Add Edge Label"
          onChange={(evt) => updateNodeText(id, evt.target.value)}
        /> */}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default EdgeLabel;