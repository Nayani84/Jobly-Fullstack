import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm({ login }) {
  const navigate = useNavigate();
  const INITIAL_STATE = {
    username: '',
    password: ''
  }

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log("waiting for login");
    const success = await login(formData);
    setIsLoading(false);
    // console.log("login");
    if (success) {
      navigate("/");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="Login-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="username">
            Username :
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            autoComplete="current-username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">
            Password :
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* <button type="submit">Log in</button> */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>

  );
}

export default LoginForm;