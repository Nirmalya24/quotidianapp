import React, { useCallback } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import {MdCancel} from "react-icons/md";

import useStore, { NodeData } from "./store";

function TextNode({ id, data }: NodeProps<NodeData>) {
  const onChange = useCallback((evt: { target: { value: any; }; }) => {
    console.log(evt.target.value);
  }, []);

  const updateNodeText = useStore((state) => state.updateNodeText);
  const getNodeText = useStore((state) => state.getNodeText);
  const deleteNode = useStore((state) => state.deleteNode);

  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <div>
        <span
          className="indicator-item text-pink-600 bg-white rounded-full cursor-default"
          onClick={() => deleteNode(id)}
        ><MdCancel /></span>
        <input
          id="text"
          name="text"
          placeholder="Add text"
          value={getNodeText(id)}
          onChange={(evt) => updateNodeText(id, evt.target.value)}
        />
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default TextNode;
