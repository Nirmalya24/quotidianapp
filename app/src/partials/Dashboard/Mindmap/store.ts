import create from "zustand";
import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
} from "reactflow";


import initialNodes from "./nodes";
import initialEdges from "./edges";

export type NodeData = {
    nodeText: string;
}

export type EdgeData = {

}

type RFState = {
    connectingNodeId: string;
    nodes: Node<NodeData>[],
    edges: Edge[],
    onNodesChange: OnNodesChange,
    onNodeDelete: OnNodesChange,
    onEdgesChange: OnEdgesChange,
    onConnect: OnConnect,
    // onConnectStart: (currentNodeId: number) => void,
    // onConnectEnd: (e: React.MouseEvent, connection: Connection) => void,
    // onInit: (instance: ReactFlowInstance) => void,
    updateNodeText: (nodeId: string, nodeText: string) => void;
    deleteNode: (nodeId: string) => void;
    getMostRecentNodeId: () => string;
    addNode: (node: Node) => void;
    addEdge: (edge: any) => void;

};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore =
    create<
        RFState>
    ((set, get) => ({
        nodes: initialNodes,
        edges: initialEdges,
        connectingNodeId: "1",
        onNodesChange: (changes: NodeChange[]) => {
            // console.log("onNodesChange", changes);
            set({
                nodes: applyNodeChanges(changes, get().nodes),
            });
        },
        onNodeDelete: (changes: NodeChange[]) => {
            console.log("onNodeDelete", changes);
        },
        onEdgesChange: (changes: EdgeChange[]) => {
            console.log("onEdgesChange", changes);
            set({
                edges: applyEdgeChanges(changes, get().edges),
            });
        },
        onConnect: (connection: Connection) => {
            set({
                edges: addEdge(connection, get().edges),
            });
        },
        updateNodeText: (nodeId: string, nodeText: string) => {
            // console.log("updateNodeText", nodeId, nodeText);
            set({
                nodes: get().nodes.map((node) => {
                    if (node.id === nodeId) {
                        // it's important to create a new object here, to inform React Flow about the cahnges
                        node.data = { ...node.data, nodeText };
                    }

                    return node;
                }),
            });
        },
        deleteNode: (nodeId: string) => {
            console.log("deleteNode", nodeId);
            set({
                nodes: get().nodes.filter((node) => node.id !== nodeId),
                edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
            });
        },
        addNode: (node: Node) => {
            set({
                nodes: [...get().nodes, node],
            });
        },
        addEdge: (edge: any) => {
            set({
                edges: [...get().edges, edge],
            });
        },
        getMostRecentNodeId: () => {
            // Increment the most recent node id by 1
            const mostRecentNodeId = get().nodes[get().nodes.length - 1].id;
            const newId = parseInt(mostRecentNodeId) + 1;
            return newId.toString();
        }
    }));

export default useStore;
