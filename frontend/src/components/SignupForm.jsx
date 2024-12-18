import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const INITIAL_STATE = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  }

  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
    navigate("/");
  };

  return (
    <div className="Signup-container">
      <h1>Sign Up</h1>
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
            autoComplete="username"
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
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="firstName">
            First Name :
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="lastName">
            Last Name :
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">
            E-mail :
          </label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Sign up</button>
      </form>
    </div>

  );
}

export default SignupForm;
