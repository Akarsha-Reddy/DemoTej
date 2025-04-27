import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  
  if (!user) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ProtectedRoute;