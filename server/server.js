const express = require("express");
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const prisma = require("@prisma/client").PrismaClient;

dotenv.config();
const client = new OAuth2Client(process.env.CLIENT_ID);

app.use(helmet());
app.use(cors());
app.use(express.json());

const findUserByEmail = async (email) => {
  await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

const createUser = async (user) => {
  await prisma.user.create({
    data: {
      email: user.email,
      first_name: user.given_name,
      last_name: user.family_name,
      google_id: user.sub,
      token: user.token,
    },
  });
};

const updateUserToken = async (user) => {
  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      token: user.token,
    },
  });
};

const verifyToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
};

app.get("/", (req, res) => {
  res.send("Quotidian server is running!");
});

app.post("/test", (req, res) => {
  console.log(req.body);
  res.send("test");
});

/*
 * Google One Tap Login
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
  console.log("Received request:", req.body);
  console.log("Checking if user is already in database...");
  const user = findUserByEmail(req.body.email);
  if (user) {
    console.log("User already exists in database!");
    console.log("Updating user token...");
    await updateUserToken(req.body);
    console.log("User token updated!");
  } else {
    console.log("User does not exist in database, creating user...");
    createUser(req.body);
  }
  console.log("Verifying token...");
  const payload = await verifyToken(req.body.token);
  const { name, email, picture, token } = payload;
  res.header("Access-Control-Allow-Origin", "*");
  res.status(201);
  res.json({ name, email, picture, token });
});

app.listen(process.env.PORT || 5001, () => {
  console.log(
    `Server running on  http://localhost:${process.env.PORT || 5001}`
  );
});
