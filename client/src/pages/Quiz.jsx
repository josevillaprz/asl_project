import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuizCss from "./QuizCss.module.css";
// import queryString from "querystring";

const Quiz = () => {
  const [quiz, setQuiz] = useState({ Questions: [] });
  const params = useParams();
  useEffect(() => {
    // fetch quiz from api
    async function fetchQuiz() {
      const response = await axios(
        `https://jose-quizapp.herokuapp.com/quizzes/${params.id}`,
        {
          headers: {
            token: localStorage.token,
          },
        }
      );
      await setQuiz(response.data);
    }
    fetchQuiz();
  }, [params.id]);

  return (
    <form className={QuizCss.container}>
      <h1 className={QuizCss.title}>{quiz.name}</h1>
      <ul>
        {quiz.Questions.map((q) => {
          return (
            <li className={QuizCss.question} key={q.id}>
              <h2>{q.question}</h2>
              <ul className={QuizCss.list}>
                {q.Choices.map((c) => {
                  return (
                    <li className={QuizCss.item} key={c.id}>
                      <input
                        className={QuizCss.radio}
                        type="radio"
                        name={"question_" + q.id}
                        id={"question_" + q.id}
                        value={c.choice}
                        required
                      />
                      <label>{c.choice}</label>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
      <input className={QuizCss.btn} type="submit" value="Submit" />
    </form>
  );
};

export default Quiz;
