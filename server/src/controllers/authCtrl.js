// Import
const express = require("express");
const router = express.Router();
const axios = require("axios");
const querystring = require("querystring");

// Models
const { LoginToken } = require("../models/index");

//Middleware

// API Routes
router.get("/callback", async (req, res) => {
  const { code } = req.query;
  // exchange client_id, secret, code to github for access token
  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: "9764054f50ffca72ebec",
      client_secret: "baf608f58999944cc0b2570265042ef03952a598",
      code,
    }
  );
  // get token from response
  const { access_token } = querystring.parse(response.data);
  // save token to session
  req.session.access_token = access_token;
  // add token to database
  const dbCreateToken = await LoginToken.create({ token: access_token });
  // redirect user to home
  // res.redirect("https://jose-quizapp.herokuapp.com?token=" + access_token);
  res.json("working");
});

router.get("/token", async (req, res) => {
  const token = req.headers.token;
  // Search for token in the db
  const foundToken = await LoginToken.findOne({
    where: {
      token: token,
    },
  });

  if (foundToken) {
    req.session.access_token = foundToken;
    res.json(foundToken);
  } else {
    res.json({ token: false });
  }
});

//export
module.exports = router;
