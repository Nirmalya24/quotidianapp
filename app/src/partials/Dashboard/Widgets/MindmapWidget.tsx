import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactFlow, {
    Background,
    Controls,
    useReactFlow,
    ReactFlowProvider,
    MiniMap
} from "reactflow";
import TextNode from "../Mindmap/TextNode";
import "reactflow/dist/style.css";
import useStore from "../Mindmap/store";
import EdgeLabel from "../Mindmap/EdgeLabel";
import { v4 as uuid } from "uuid";


const nodeTypes = {
    text: TextNode,
}

const edgeTypes = {
    edgeLabel: EdgeLabel
}


const MindmapWidget = React.memo(function MindmapWidget() {
    const reactFlowWrapper = useRef(null);
    const connectingNodeId = useRef(null);
    const { project } = useReactFlow();
    const { nodes, addNode, addEdge, edges, onNodesChange, onEdgesChange, onConnect, onNodeDragStop, onInit } = useStore();

    const [isSelectable, setIsSelectable] = useState(true);
    const [isDraggable, setIsDraggable] = useState(true);
    const [isConnectable, setIsConnectable] = useState(true);
    const [zoomOnScroll, setZoomOnScroll] = useState(true);
    const [panOnScroll, setPanOnScroll] = useState(true);
    const [zoomOnDoubleClick, setZoomOnDoubleClick] = useState(true);
    const [panOnDrag, setpanOnDrag] = useState(true);

    const onConnectStart = useCallback((_: any, { nodeId }: any) => {
        connectingNodeId.current = nodeId;
        console.log("onConnectStart", connectingNodeId.current);
        console.log("onConnectStart", connectingNodeId);
    }, []);

    const onConnectEnd = useCallback(
        (event: any) => {
            const targetIsPane = (event.target as Element).classList.contains('react-flow__pane');

            if (targetIsPane) {
                // we need to remove the wrapper bounds, in order to get the correct position
                // @ts-ignore
                const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
                const newNodeId = uuid();
                const newNode = {
                    id: newNodeId,
                    type: 'text',
                    // we are removing the half of the node width (75) to center the new node
                    position: project({ x: event.clientX - left - 75, y: event.clientY - top }),
                    data: { nodeText: `` },
                };

                // Add the new node to the existing nodes
                addNode(newNode);
                // Add the edge between the connecting node and the new node
                addEdge({ id: uuid(), source: connectingNodeId.current, target: newNodeId });
            }
        },
        [project]
    );

    return (
        <div className="h-full flex grow" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onNodesChange={onNodesChange}
                onNodeDragStop={onNodeDragStop}
                onEdgesChange={onEdgesChange}
                elementsSelectable={isSelectable}
                nodesConnectable={isConnectable}
                nodesDraggable={isDraggable}
                zoomOnScroll={zoomOnScroll}
                panOnScroll={panOnScroll}
                zoomOnDoubleClick={zoomOnDoubleClick}
                onConnect={onConnect}
                onConnectStart={onConnectStart}
                onConnectEnd={onConnectEnd}
                panOnDrag={panOnDrag}
                onInit={onInit}
                fitView
                attributionPosition="top-right"
            >
                <Background />
                <MiniMap />
                <Controls />
            </ReactFlow>
        </div>
    );
});

export default () => (
    <ReactFlowProvider>
        <MindmapWidget/>
    </ReactFlowProvider>
);