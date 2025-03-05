import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// Define props type for children components
interface PrivateRouteProps {
  children: ReactNode; // ReactNode allows JSX elements as children
}

// Protects routes by checking JWT token authentication
const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const token = localStorage.getItem('access_token');

  // Redirect to login if token is missing
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children
  return <>{children}</>;
};

export default PrivateRoute;
