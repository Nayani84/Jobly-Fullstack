import React from "react";
import { Navigate } from "react-router-dom";

/** Protect a route by redirecting unauthenticated users. */
function ProtectedRoute({ element, isAuthenticated, loading }) {
  console.log("ProtectedRoute: isAuthenticated =", isAuthenticated);
  console.log("ProtectedRoute: loading =", loading);
  
  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!isAuthenticated) {
    console.warn("User not authenticated. Redirecting to login.");
    return <Navigate to="/login" replace />;
  }
  return element;
}

export default ProtectedRoute;
