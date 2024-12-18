import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext";
import "./NavBar.css";

function NavBar({ onLogout }) {
  const { currentUser } = useContext(CurrentUserContext);
  const token = window.localStorage.getItem("jobly-token");
  const navigate = useNavigate();

  const logout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Jobly</Link>
      {currentUser ? (
        <>
          <Link to="/companies">Companies</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/profile">Profile</Link>
          <span> {currentUser.username}</span>
          <button onClick={logout}>Log out</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
