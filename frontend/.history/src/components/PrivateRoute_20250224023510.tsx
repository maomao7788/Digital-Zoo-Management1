import React from 'react';
import { Navigate } from 'react-router-dom';

// Checks if user is authenticated based on token presence
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('access_token');
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
