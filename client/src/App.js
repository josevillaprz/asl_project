import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import querystring from "querystring";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import axios from "axios";

const App = () => {
  const [jwt, setJwt] = useState();

  useEffect(() => {
    // fetch token if found display routes
    async function fetchToken() {
      // extract token from url
      const params = querystring.parse(
        window.location.search.replace(/^\?/, "")
      );
      if (typeof localStorage.token === "undefined") {
        localStorage.token = params.token;
      }
      // Make request to api to verify token is in database
      const response = await axios("http://localhost:3000/auth/token", {
        headers: {
          token: localStorage.token,
        },
      });
      // set jwt state on request response
      setJwt(response.data.token);
    }
    fetchToken();
  }, []);

  if (!jwt) {
    return <Login />;
  }

  return (
    <Router>
      <Nav />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
