const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID); // Google OAuth2 client
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { v4: uuid } = require("uuid");
/**
 * @param {string} token
 * @returns {Promise<import("google-auth-library").LoginTicket>}
 * Sends a request to the Google OAuth2 API to verify the token
 * and returns the response.
 **/
const verifyToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  return ticket.getPayload();
};

/**
 * @param {object} user
 * @param {string} token
 * @returns {Promise<import("@prisma/client").User>}
 * Creates a new user in the database if the user does not exist.
 * If the user exists, it returns the user.
 */
const upsertUser = async (user, token) => {
  await prisma.user.upsert({
    where: {
      google_id: user.sub,
    },
    update: {
      token: token,
    },
    create: {
      email: user.email,
      given_name: user.given_name,
      family_name: user.family_name,
      google_id: user.sub,
      token: token,
    },
  });
};

/**
 * Gets the requested todoItem of the user
 */
const getTodos = async (email, todoId) => {
  return await prisma.todos.findMany({
    where: {
      email: email,
      todoId: todoId,
    },
  });
};

const getAllTodods = async (email) => {
  return await prisma.todos.findMany({
    where: {
      email: email,
    },
    select: {
      todoId: true,
      description: true,
      completed: true,
    },
  });
};

/**
 * Update the todoItem of the user
 */
const updateTodos = async (todoId) => {
  // Get the todoItem
  const todoItem = await prisma.todos.findUnique({
    where: {
      todoId: todoId,
    },
  });

  // Update the todoItem
  return await prisma.todos.update({
    where: {
      todoId: todoId,
    },
    data: {
      completed: !todoItem.completed,
    },
  });
};

const addTodo = async (email, todoItem) => {
  return await prisma.todos.create({
    data: {
      email: email,
      todoId: todoItem.todoId,
      description: todoItem.description,
      completed: todoItem.completed,
    },
  });
};

const deleteTodo = async (todoId) => {
  return await prisma.todos.delete({
    where: {
      todoId: todoId,
    },
  });
};



// Mindmap queries

const addDefaultNode = async (email) => {
  console.log("Creating a default node");
  const defaultNode = {
    nodeId: uuid(),
    type: "text",
    data: { nodeText: "default" },
    position: { x: 150, y: 25 },
  };
  return [
    await prisma.nodes.create({
      data: {
        email: email,
        nodeId: defaultNode.nodeId,
        type: defaultNode.type,
        data: defaultNode.data,
        position: defaultNode.position,
      },
    }),
  ];
};

const getNodes = async (email) => {
  return await prisma.nodes.findMany({
    where: {
      email: email,
    },
    select: {
      nodeId: true,
      type: true,
      data: true,
      position: true,
    },
  });
};

const deleteNode = async (nodeId) => {
  return await prisma.nodes.delete({
    where: {
      nodeId: nodeId,
    },
  });
};

const upsertNode = async (email, node) => {
  return await prisma.nodes.upsert({
    where: {
      nodeId: node.id,
    },
    update: {
      data: node.data,
      position: node.position,
    },
    create: {
      email: email,
      nodeId: node.id,
      type: node.type,
      data: node.data,
      position: node.position,
    },
  });
};

const updateNode = async (node) => {
  return await prisma.nodes.update({
    where: {
      nodeId: node.id,
    },
    data: {
      data: node.data,
      position: node.position,
    },
  });
};

const getEdges = async (email) => {
  return await prisma.edges.findMany({
    where: {
      email: email,
    },
    select: {
      edgeId: true,
      source: true,
      target: true,
    },
  });
};

const upsertEdge = async (email, edge) => {
  return await prisma.edges.upsert({
    where: {
      edgeId: edge.id,
    },
    update: {
      source: edge.source,
      target: edge.target,
    },
    create: {
      email: email,
      edgeId: edge.id,
      source: edge.source,
      target: edge.target,
    },
  });
};

const deleteEdge = async (edgeId) => {
  return await prisma.edges.delete({
    where: {
      edgeId: edgeId,
    },
  });
};

module.exports = {
  verifyToken,
  upsertUser,
  getTodos,
  getAllTodods,
  updateTodos,
  addTodo,
  deleteTodo,
  getNodes,
  getEdges,
  upsertNode,
  upsertEdge,
  addDefaultNode,
  updateNode,
  deleteNode,
  deleteEdge,
};
