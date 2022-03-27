// Import
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

// Models
const { Choice, Question } = require("../models");

//Middleware
router.use(bodyParser.urlencoded({ extended: false }));

// API Routes
router.get("/", async (req, res) => {
  const choices = await Choice.findAll({
    include: Question,
  });
  res.json(choices);
});

router.post("/", async (req, res) => {
  const { choice, questionId } = req.body;
  const createdChoice = Choice.create({ choice, questionId });
  res.json(createdChoice);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const choice = Choice.findByPk(id, {
    include: Question,
  });
  res.json(choice);
});

//export
module.exports = router;
