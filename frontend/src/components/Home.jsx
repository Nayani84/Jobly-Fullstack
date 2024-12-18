import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { CurrentUserContext } from "../CurrentUserContext";
import "./Home.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Home({ loading }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!currentUser || !currentUser.firstName) {
    return (
      <div className="Home">
        <h1>Jobly! </h1>
        <h2>All the jobs in one, convenient place.</h2>
        <div>
          <Link className="btn btn-primary me-2" to="/login">Login</Link>
          <Link className="btn btn-primary" to="/signup">Sign Up</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="Home">
      <h1>Welcome back, {currentUser.username}!</h1>
    </div>
  );
}


export default Home;
