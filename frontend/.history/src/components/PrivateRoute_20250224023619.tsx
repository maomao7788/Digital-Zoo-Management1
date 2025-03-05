import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// Protects routes for authenticated users
interface PrivateRouteProps {
  children: ReactNode;
}

// If the user is authenticated, render the children; otherwise, redirect to login
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem('access_token');
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;