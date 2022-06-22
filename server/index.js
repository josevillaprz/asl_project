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

app.use(express.static(path.join(__dirname, "../../reactjs/build")));

// app
const app = express();
// middleware

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
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// port
app.listen(process.env.PORT || 3000, () => console.log(`Server is running`));
