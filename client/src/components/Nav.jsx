import React from "react";
import { Link } from "react-router-dom";
import NavCss from "./NavCss.module.css";

const Nav = () => {
  return (
    <div className={NavCss.container}>
      <nav>
        <ul className={NavCss.list}>
          <li>
            <Link
              className={NavCss.link}
              to={localStorage.token ? "/?token=" + localStorage.token : "/"}
            >
              Home
            </Link>
          </li>
          <li>
            <Link className={NavCss.link} to="/login">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
