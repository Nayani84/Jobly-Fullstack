import React, { useState, useContext, useEffect } from "react";
import JoblyApi from "../JoblyApi";
import { CurrentUserContext } from "../CurrentUserContext";
import { useParams } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const { username } = useParams();
  const {currentUser, updateCurrentUser} = useContext(CurrentUserContext);
  console.log("Profile: currentUser from context =", currentUser);
  console.log("Profile: route username =", username);
  console.log("Profile: currentUser =", currentUser);
const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

   const [formErrors, setFormErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

   // Update formData once currentUser is available
   useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || "",
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        password: ""
      });
    }
  }, [currentUser]);

  if (!currentUser ) {
    console.log("Profile: currentUser is null, showing loading message.");
    return <div>Loading...</div>; // Ensure currentUser is loaded before rendering
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log("Current User:", currentUser);
    // console.log(currentUser);
    if (!currentUser?.username) {
      setFormErrors(["User is not properly authenticated. Please log in again."]);
      return;
    }
    try {
      const updatedUser = await JoblyApi.updateUser(currentUser.username, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      setSuccessMessage("Profile updated successfully!!");
      setFormErrors([]);
      updateCurrentUser(updatedUser);
    } catch (err) {
      setFormErrors(err);
      setSuccessMessage('');
    }
  }

  return (
    <div className="Profile-container">
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={formData.username}
            autoComplete="new-username"
            disabled
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            autoComplete="new-email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            autoComplete="new-password"
            value={formData.password }
            onChange={handleChange}
            type="password"
          />
        </div>
        {formErrors.length > 0 && (
          <div className="errors">
            {formErrors.map((err) => (
              <p key={err}>{err}</p>
            ))}
          </div>
        )}
        {successMessage && <div className="success">{successMessage}</div>}
        <button type="submit">Save Changes</button>

      </form>
    </div>
  )

}

export default Profile;
