import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CompanyList from "./components/CompanyList";
import CompanyDetail from "./components/CompanyDetail";
import JobList from "./components/JobList";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import JoblyApi from "./JoblyApi";
import { CurrentUserProvider } from "./CurrentUserContext";
import { jwtDecode } from 'jwt-decode';

import useLocalStorage from "./hooks/useLocalStorage";
import ProtectedRoute from "./ProtectedRoute";


function App() {
  const [token, setToken] = useLocalStorage("jobly-token", null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log("Token in useEffect:", token);
    async function fetchUser() {
      if (token) {
        try {
          JoblyApi.token = token;
          const { username } = jwtDecode(token);

          // console.log("Decoded username:", username);
          const user = await JoblyApi.getCurrentUser(username);
          // console.log("Fetched user:", user);
          setCurrentUser({ ...user, applications: new Set(user.applications) });
          // console.log(user);
        } catch (err) {
          console.error("Error Fetching User", err);
          setToken(null);
          setCurrentUser(null);
        }
      }
      else {
        setCurrentUser(null);
      }
      setLoading(false);
    }
    fetchUser();
  }, [token, setToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Login function
  const login = async (loginData) => {
    try {
      const newToken = await JoblyApi.login(loginData);
      console.log(loginData);
      setToken(newToken);
      JoblyApi.token = newToken;

      const { username } = jwtDecode(newToken);
      const user = await JoblyApi.getCurrentUser(username);

      setCurrentUser({ ...user, applications: new Set(user.applications) });
      return true;
    } catch (err) {
      console.log(err.response);
      console.error("Login failed:", err);
      return false;
    }
  };

  // Signup function
  const signup = async (signupData) => {
    try {
      const newToken = await JoblyApi.signup(signupData);
      setToken(newToken);
      JoblyApi.token = newToken;

      const { username } = jwtDecode(newToken);
      const user = await JoblyApi.getCurrentUser(username);

      setCurrentUser({ ...user, applications: new Set(user.applications) });
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  // applyToJob function
  async function applyToJob(jobId) {
    if (!currentUser.applications.has(jobId)) {
      try {
        await JoblyApi.applyToJob(currentUser.username, jobId);
        setCurrentUser((user) => ({
          ...user,
          applications: new Set([...user.applications, jobId]),
        }));
      } catch (err) {
        console.error("Error applying to job:", err);
      }
    }
  }


  const isAuthenticated = !!token && !!currentUser;
  console.log("App.js: isAuthenticated =", isAuthenticated);
  console.log("App.js: loading =", loading);
  console.log("App.js: currentUser =", currentUser);


  return (
    <CurrentUserProvider currentUser={currentUser}>
      <BrowserRouter>
        <NavBar onLogout={() => {
          setToken(null);
          JoblyApi.token = null;
          setCurrentUser(null);
        }} />
        <Routes>
          <Route path="/" element={<Home loading={loading} />} />
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/signup" element={<SignupForm signup={signup} />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={<Profile />}
                isAuthenticated={isAuthenticated}
                loading={loading}
              />} />

          <Route path="/companies" element={<ProtectedRoute
            element={<CompanyList />}
            isAuthenticated={isAuthenticated}
          />} />

          <Route
            path="/companies/:handle"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                element={<CompanyDetail applyToJob={applyToJob} />}

              />} />

          <Route
            path="/jobs"
            element={
              <ProtectedRoute
                element={<JobList applyToJob={applyToJob} />}
                isAuthenticated={isAuthenticated}
                loading={loading}
              />} />

        </Routes>
      </BrowserRouter>
    </CurrentUserProvider>
  );
}

export default App;