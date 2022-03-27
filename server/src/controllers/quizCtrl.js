// imports
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

// models
const { Quiz, Question, Choice } = require("../models");

// middleware
router.use(bodyParser.urlencoded({ extended: false }));

// api routes
router.get("/", async (req, res) => {
  const quizzes = await Quiz.findAll({
    include: [{ model: Question, include: Choice }],
  });
  res.json(quizzes);
});

router.post("/", async (req, res) => {
  const { name, weight } = req.body;
  const quiz = await Quiz.create({ name, weight });
  res.json(quiz);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const quiz = await Quiz.findByPk(id, {
    include: [{ model: Question, include: Choice }],
  });
  res.json(quiz);
});

// export
module.exports = router;
