const express = require("express");
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

dotenv.config(); // Load environment variables from .env file
const client = new OAuth2Client(process.env.CLIENT_ID); // Google OAuth2 client

app.use(helmet()); // Set security HTTP headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

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
  const tokenReceived = req.body.token;
  console.log("Received request");
  console.log("Verifying token...");
  const payload = await verifyToken(req.body.token);
  console.log("Payload:", payload);
  const { name, family_name, given_name, email, sub } = payload;
  await upsertUser(payload, tokenReceived);

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
  await deleteTodo(todoId)
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
  const todo = await updateTodos(todoId);
  console.log("[TODO] Update Success");
  res.sendStatus(200);
});

app.post("/api/addTodoItem", async (req, res) => {
  const { email, todo } = req.body.body;
  console.log("[TODO] Add TodoItem:", email, todo);
  console.log("Email: ", email);
  console.log("Todo: ", todo);
  await addTodo(email, todo);
  console.log("TodoItem added");
  res.sendStatus(200);
});

app.get("/api/getTodoItems/:email", async (req, res) => {
  const { email } = req.params;
  // console.log(req.body.body);
  console.log("[TODO] Get all TodoItems:", email);
  const todoItems = await getAllTodods(email)
    .then((data) => {
      console.log("[TODO] Get all TodoItems Success");
      res.status(200).json(data);
    })
    .catch((e) => {
      console.log("[TODO] Error getting all TodoItems: ", e.meta.cause);
    });
});

app.listen(process.env.PORT || 5001, () => {
    console.log(
      `Server running on  http://localhost:${process.env.PORT || 5001}`
    );
});
