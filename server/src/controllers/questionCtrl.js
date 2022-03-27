// imports
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

// Models
const { Question, Choice } = require("../models");

// middleware
router.use(bodyParser.urlencoded({ extended: false }));

// api routes
router.get("/", async (req, res) => {
  const questions = await Question.findAll({
    // include: Choice,
  });
  res.json(questions);
});

router.post("/", async (req, res) => {
  const { question, quizId } = req.body;
  const createdQuestion = await Question.create({ question, quizId });
  res.json(createdQuestion);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const question = await Question.findByPk(id, {
    include: Choice,
  });
  res.json(question);
});

// export
module.exports = router;
