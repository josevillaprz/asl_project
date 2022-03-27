import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HomeCss from "./HomeCss.module.css";

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    // fetch quizzes from API
    async function fetchQuizzes() {
      const response = await axios("http://localhost:3000/quizzes", {
        headers: {
          token: localStorage.token,
        },
      });
      setQuizzes(response.data);
    }
    fetchQuizzes();
  }, []);
  return (
    <main className={HomeCss.container}>
      <h1 className={HomeCss.title}>Home</h1>
      <ul className={HomeCss.list}>
        {quizzes.map((quiz, i) => {
          return (
            <Link
              className={HomeCss.link}
              key={quiz.id}
              to={"/quiz/" + quiz.id}
            >
              {quiz.name}
            </Link>
          );
        })}
      </ul>
    </main>
  );
};

export default Home;
