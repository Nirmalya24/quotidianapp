import axios from "axios";
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
import nodes from "./nodes";

interface ImportMetaEnv {
    VITE_API_URL?: string;
}

export type NodeData = {
    nodeText: string;
};

export type EdgeData = {};

const URL = import.meta.env.VITE_API_URL;
const email: string = localStorage.getItem("loginData")
    ? JSON.parse(localStorage.getItem("loginData") || "").email
    : "";

const addNodeToDB = async (node: Node<NodeData>) => {
    console.log("addNode", node);
    const response = await axios.post(`${URL}/nodes/`, {
        body: {
            email: email,
            node: node,
        },
    });
    console.log("addNode", response.data);
    return response.data;
};

const updateNode = async (node: Node<NodeData>) => {
    console.log("updateNode", node);
    const response = await axios.patch(`${URL}/nodes/`, {
        body: {
            node: node,
        },
    });
    console.log("updateNode", response.data);
    return response.data;
};

const upsertEdge = async (edge: Edge<EdgeData>) => {
    console.log("upsertEdge", edge);
    const response = await axios.patch(`${URL}/edges/`, {
        body: {
            email: email,
            edge: edge,
        },
    });

    console.log("upsertEdge", response.data);
    return response.data;
};

const getNodes = async (): Promise<Node<NodeData>[]> => {
    const response = await axios.get(`${URL}/nodes/${email}`);
    console.log("getNodes Response", response.data);
    return response.data;
};

const getEdges = async () => {
    const response = await axios.get(`${URL}/edges/${email}`);
    console.log("getEdges Response", response.data);
    return response.data;
};

type RFState = {
    nodes: Node<NodeData>[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onNodeDragStop: any;
    onNodeDelete: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    onInit: () => void;
    updateNodeText: (nodeId: string, nodeText: string) => void;
    deleteNode: (nodeId: string) => void;
    addNode: (node: Node) => void;
    addEdge: (edge: any) => void;
    getNodeText: (nodeId: string) => string;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,
    onNodesChange: (changes: NodeChange[]) => {
        console.log("onNodesChange", changes);
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
    onNodeDragStop: (event: React.MouseEvent, node: Node, nodes: Node[]) => {
        console.log("OnNodeDragStop", node.id);
        updateNode(node);
    },
    onConnect: (connection: Connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },
    updateNodeText: (nodeId: string, nodeText: string) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === nodeId) {
                    // it's important to create a new object here, to inform React Flow about the cahnges
                    node.data = { ...node.data, nodeText };
                    console.log("Text changed detected, updating node", node);
                    updateNode(node);
                }

                return node;
            }),
        });
    },
    deleteNode: (nodeId: string) => {
        console.log("deleteNode", nodeId);
        set({
            nodes: get().nodes.filter((node) => node.id !== nodeId),
            edges: get().edges.filter(
                (edge) => edge.source !== nodeId && edge.target !== nodeId
            ),
        });
    },
    addNode: (node: Node) => {
        console.log("addNode", node);
        addNodeToDB(node);
        set({
            nodes: [...get().nodes, node],
        });
    },
    addEdge: (edge: any) => {
        console.log("addEdge", edge);
        upsertEdge(edge);
        set({
            edges: [...get().edges, edge],
        });
    },
    onInit: async () => {
        console.log("Get nodes and edges from database");
        const nodesDB = await getNodes();

        const edges = await getEdges();
        set({
            nodes: [...get().nodes, ...nodesDB],
            edges: [...get().edges, ...edges],
        });
    },
    getNodeText: (nodeId: string) => {
        const node: any = get().nodes.find((node) => node.id === nodeId);
        return node ? node.data.nodeText : "";
    },
}));

export default useStore;
