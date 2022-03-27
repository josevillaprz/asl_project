import React, { useEffect } from "react";
import { BsGithub } from "react-icons/bs";
import LoginCss from "./LoginCss.module.css";

const Login = () => {
  useEffect(() => {
    function clearStorage() {
      localStorage.clear();
    }
    clearStorage();
  });
  return (
    <section className={LoginCss.container}>
      <h1 className={LoginCss.title}>Login</h1>
      <p className={LoginCss.body}>Sign in to take a quiz!</p>
      <a
        className={LoginCss.btn}
        href="https://github.com/login/oauth/authorize?client_id=9764054f50ffca72ebec"
      >
        <span className={LoginCss.icon}>
          <BsGithub size={25} />
        </span>
        Sign in with Github
      </a>
    </section>
  );
};

export default Login;
