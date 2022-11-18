const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
// prismaQueries.js
const prismaQueries = require("./prismaQueries");

dotenv.config(); // Load environment variables from .env file

app.use(helmet()); // Set security HTTP headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

/**
 * Default route to check if the server is running
 */
app.get("/", (req, res) => {
  res.send("Quotidian server is running!");
});

/**
 * Test route to check if the server is running
 */
app.post("/test", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

/*
 * Google One Tap Login route
 * https://developers.google.com/identity/gsi/web/reference/js-reference#googleonetap
 * This function is responsible for verifying the token sent from the client
 * and returning the user's data.
 * If the user is not in the database, it will create a new user.
 * If the user is in the database, it will update the user's token.
 * The token is used to verify the user's identity when they make requests to the API.
 * The token is stored in the database and sent to the client.
 *
 */
app.post("/api/google-login", async (req, res) => {
  console.log(req.body);
  const tokenReceived = req.body.body.token;
  console.log("Received request");
  console.log("Verifying token...");
  const payload = await prismaQueries.verifyToken(tokenReceived);
  console.log("Payload:", payload);
  const { name, family_name, given_name, email, sub } = payload;
  await prismaQueries.upsertUser(payload, tokenReceived);

  res.header("Access-Control-Allow-Origin", "*");
  res.status(201);
  res.json({ name, email, tokenReceived });
});

/**
 * Get a todoItem to be Deleted
 */

app.delete("/api/deleteTodoItem/:id", async (req, res) => {
  const todoId = req.params.id;
  console.log("[TODO] Delete TodoItem:", todoId);
  await prismaQueries
    .deleteTodo(todoId)
    .then(() => {
      console.log("[TODO] Delete Success");
      res.sendStatus(200);
    })
    .catch((e) => {
      console.log("[TODO] Error delete: ", e.meta.cause);
    });
});

/*
 * Get a todoItem to be added/updated by the user from the database
 */
app.patch("/api/updateTodoItem/:id", async (req, res) => {
  const todoId = req.params.id;
  console.log("[TODO] Update TodoItem:", todoId);
  const todo = await prismaQueries.updateTodos(todoId);
  console.log("[TODO] Update Success");
  res.sendStatus(200);
});

app.post("/api/addTodoItem", async (req, res) => {
  const { email, todo } = req.body.body;
  console.log("[TODO] Add TodoItem:", email, todo);
  console.log("Email: ", email);
  console.log("Todo: ", todo);
  await prismaQueries.addTodo(email, todo);
  console.log("TodoItem added");
  res.sendStatus(200);
});

app.get("/api/getTodoItems/:email", async (req, res) => {
  const { email } = req.params;
  // console.log(req.body.body);
  console.log("[TODO] Get all TodoItems:", email);
  const todoItems = await prismaQueries
    .getAllTodods(email)
    .then((data) => {
      console.log("[TODO] Get all TodoItems Success");
      res.status(200).json(data);
    })
    .catch((e) => {
      console.log("[TODO] Error getting all TodoItems: ", e.meta.cause);
    });
});

/*
Mindmap Routes
*/

/**
 * Get all mindmap edges for a user
 */
app.get("/api/edges/:email", async (req, res) => {
  const { email } = req.params;
  console.log("[MINDMAP:EDGES] GET:", email);
  const edges = await prismaQueries
    .getEdges(email)
    .then((data) => {
      console.log("[MINDMAP:EDGES] GET Success");
      console.log(data);
      data.forEach((edge) => {
        edge.id = edge.edgeId;
        delete edge.edgeId;
      });
      res.status(200).json(data);
    })
    .catch((e) => {
      console.log("[MINDMAP:EDGES] GET Error : ", e);
    });
});

/**
 * Get all mindmap nodes for a user
 */
app.get("/api/nodes/:email", async (req, res) => {
  const { email } = req.params;
  console.log("[MINDMAP:NODES] GET:", email);

  // Get all nodes for a user
  let nodes = await prismaQueries.getNodes(email);
  // console.log(nodes)
  // If there are no nodes, create a new node
  if (nodes.length === 0) {
    console.log("[MINDMAP:NODES] No nodes found. Creating new node.");
    nodes = await prismaQueries.addDefaultNode(email);
    console.log("[MINDMAP:NODES] New node created:", nodes);
  } else {
    console.log("[MINDMAP:NODES] GET Success");
  }
  nodes.forEach((node) => {
    node.id = node.nodeId;
    delete node.nodeId;
  });
  res.status(200).json(nodes);
});

/**
 * Update a mindmap node
 * @param {string} email - The user's email
 *
 */
app.patch("/api/nodes/", async (req, res) => {
  const { node } = req.body.body;
  console.log("[MINDMAP] Update node:");
  await prismaQueries
    .updateNode(node)
    .then(() => {
      console.log("[MINDMAP] Update node Success");
      res.sendStatus(200);
    })
    .catch((e) => {
      console.log("[MINDMAP] Error updating node: ", node, e);
    });
});

/**
 * Add a mindmap node
 * @param {string} email - The user's email
 *
 */
app.post("/api/nodes/", async (req, res) => {
  const { email, node } = req.body.body;
  console.log("[MINDMAP] Add node:", email, node);
  await prismaQueries
    .upsertNode(email, node)
    .then(() => {
      console.log("[MINDMAP] Add node Success");
      res.sendStatus(200);
    })
    .catch((e) => {
      console.log("[MINDMAP] Error adding node: ", e);
    });
});

/**
 * Delete a mindmap node
 *
 */
app.delete("/api/nodes/:id", async (req, res) => {
  const nodeId = req.params.id;
  console.log("[MINDMAP] Delete node:", nodeId);
  await prismaQueries
    .deleteNode(nodeId)
    .then(() => {
      console.log("[MINDMAP] Delete node Success");
      res.sendStatus(200);
    })
    .catch((e) => {
      console.log("[MINDMAP] Error deleting node: ", e);
      res.sendStatus(500);
    });
});

/**
 * Update a mindmap edge
 * @param {string} email - The user's email
 */
app.patch("/api/edges/", async (req, res) => {
  const { email, edge } = req.body.body;
  console.log("[MINDMAP] Update edge:", email, edge);
  await prismaQueries
    .upsertEdge(email, edge)
    .then(() => {
      console.log("[MINDMAP] Update edge Success");
      res.sendStatus(200);
    })
    .catch((e) => {
      console.log("[MINDMAP] Error updating edge: ", e);
    });
});

/**
 * Delete a mindmap edge
 */
app.delete("/api/edges/:id", async (req, res) => {
  const edgeId = req.params.id;
  console.log("[MINDMAP] Delete edge:", edgeId);
  await prismaQueries.deleteEdge(edgeId);
  console.log("[MINDMAP] Delete edge Success");
  res.sendStatus(200);
});

/**
 * News Routes
 */

app.get("/api/news/:category", async (req, res) => {
  const { category } = req.params;
  console.log("[NEWS] GET:", category);
  const URL = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=342e5a3a832e49e681b0a6c6f2665800`;
  const news = await axios(URL).then((response) => {
    console.log("[NEWS] GET Success");
    res.status(200).json(response.data);
  });
});

app.listen(process.env.PORT || 5001, () => {
  console.log(
    `Server running on  http://localhost:${process.env.PORT || 5001}`
  );
});
