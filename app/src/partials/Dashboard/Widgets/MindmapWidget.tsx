import React, { useState, useCallback, useRef } from "react";
import ReactFlow, {
    Background,
    Controls,
    useReactFlow,
    ReactFlowProvider,
    MiniMap
} from "reactflow";
import TextNode from "../Mindmap/TextNode";
// import DeleteEdge from "../Mindmap/DeleteEdge";
import "reactflow/dist/style.css";
import useStore from "../Mindmap/store";
import EdgeLabel from "../Mindmap/EdgeLabel";


const nodeTypes = {
    text: TextNode,
}

const edgeTypes = {
    edgeLabel: EdgeLabel
}


function MindmapWidget() {
    const reactFlowWrapper = useRef(null);
    const connectingNodeId = useRef(null);
    const { project } = useReactFlow();
    const { nodes, addNode, addEdge, edges, onNodesChange, onEdgesChange, onConnect, getMostRecentNodeId } = useStore();

    const [isSelectable, setIsSelectable] = useState(true);
    const [isDraggable, setIsDraggable] = useState(true);
    const [isConnectable, setIsConnectable] = useState(true);
    const [zoomOnScroll, setZoomOnScroll] = useState(true);
    const [panOnScroll, setPanOnScroll] = useState(true);
    const [zoomOnDoubleClick, setZoomOnDoubleClick] = useState(true);
    const [panOnDrag, setpanOnDrag] = useState(true);

    const onConnectStart = useCallback((_: any, {nodeId}: any) => {
        connectingNodeId.current = nodeId;
    }, []);

    const onConnectEnd = useCallback(
        (event: any) => {
            const targetIsPane = (event.target as Element).classList.contains('react-flow__pane');

            if (targetIsPane) {
                // we need to remove the wrapper bounds, in order to get the correct position
                // @ts-ignore
                const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
                const id = getMostRecentNodeId();
                const newNode = {
                    id,
                    type: 'text',
                    // we are removing the half of the node width (75) to center the new node
                    position: project({ x: event.clientX - left - 75, y: event.clientY - top }),
                    data: { nodeText: `` },
                };

                // Add the new node to the existing nodes
                addNode(newNode);
                // Add the edge between the connecting node and the new node
                addEdge({ id, source: connectingNodeId.current, target: id });
            }
        },
        [project]
    );

    return (
        <div className="h-full w-screen flex grow" ref={ reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onNodesChange={onNodesChange}
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
                fitView
                attributionPosition="top-right"
            >
                <Background />
                <MiniMap />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default () => (
    <ReactFlowProvider>
        <MindmapWidget/>
    </ReactFlowProvider>
);


// const nodeTypes = { textUpdater: TextNode };
// const edgeTypes = {
//   deleteEdge: DeleteEdge,
// };

// export const initialNodes = [
//   {
//     id: "0",
//     position: { x: 0, y: 0 },
//     data: { label: "Node 1" },
//     type: "input",
//   },
//   {
//     id: "1",
//     position: { x: 250, y: 0 },
//     data: { label: "Node 2" },
//     type: "textUpdater",
//   },
// ];

// let id = 2;
// const getId = () => `${id++}`;

// const fitViewOptions = {
//   padding: 5,
// };

// const initialEdges = [
//   //   { id: "1-2", source: "1", target: "2", label: "to the", type: "step" },
// ];

// const AddNodeOnEdgeDrop = () => {
//   const reactFlowWrapper = useRef(null);
//   const connectingNodeId = useRef(null);
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const { project } = useReactFlow();
//   const onConnect = useCallback(
//     (params) =>
//       setEdges((eds) => addEdge({ ...params, type: "deleteEdge" }, eds)),
//     []
//   );

//   const onConnectStart = useCallback((_, { nodeId }) => {
//     connectingNodeId.current = nodeId;
//   }, []);

//   const onConnectEnd = useCallback(
//     (event) => {
//       const targetIsPane = event.target.classList.contains("react-flow__pane");

//       if (targetIsPane) {
//         // we need to remove the wrapper bounds, in order to get the correct position
//         const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
//         const id = getId();
//         const newNode = {
//           id,
//           // we are removing the half of the node width (75) to center the new node
//           position: project({
//             x: event.clientX - left - 75,
//             y: event.clientY - top,
//           }),
//           data: { label: `Node ${id}` },
//         };

//         setNodes((nds) => nds.concat(newNode));
//         setEdges((eds) =>
//           eds.concat({ id, source: connectingNodeId.current, target: id })
//         );
//       }
//     },
//     [project]
//   );

//   return (
//     <div className="h-full w-screen" ref={reactFlowWrapper}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         onConnectStart={onConnectStart}
//         onConnectEnd={onConnectEnd}
//         nodeTypes={nodeTypes}
//         edgeTypes={edgeTypes}
//         // fitView
//         // fitViewOptions={fitViewOptions}
//         className="mindmap"
//       >
//         <Background />
//         <Controls />
//       </ReactFlow>
//     </div>
//   );
// };

// function MindmapWidget() {
//   return (
//     <div className="h-full w-screen">
//       <ReactFlowProvider>
//         <AddNodeOnEdgeDrop />
//       </ReactFlowProvider>
//     </div>
//   );
// }

// const onNodeDragStart = (event, node) => console.log('drag start', node);
// const onNodeDragStop = (event, node) => console.log('drag stop', node);
// const onNodeClick = (event, node) => console.log('click node', node);
// const onPaneClick = (event) => console.log('onPaneClick', event);
// const onPaneScroll = (event) => console.log('onPaneScroll', event);
// const onPaneContextMenu = (event) => console.log('onPaneContextMenu', event);