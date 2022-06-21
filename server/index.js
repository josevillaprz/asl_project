// Imports
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const quizCtrl = require("./src/controllers/quizCtrl");
const questionCtrl = require("./src/controllers/questionCtrl");
const choiceCtrl = require("./src/controllers/choiceCtrl");
const authCtrl = require("./src/controllers/authCtrl");
const isAuthenticated = require("./src/middlewares/authenticate");
const path = require("path");

// app
const app = express();

// middleware
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(
  session({
    secret: "keyboard cat",
    cookies: { maxAge: 6000 },
    saveUninitialized: false,
  })
);

app.use(
  cors({
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    preflightContinue: false,
    credentials: true,
    allowCrossDomain: true,
  })
);

// controllers
app.use("/quizzes", isAuthenticated, quizCtrl);
app.use("/questions", isAuthenticated, questionCtrl);
app.use("/choices", isAuthenticated, choiceCtrl);
app.use("/auth", authCtrl);

// port
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
