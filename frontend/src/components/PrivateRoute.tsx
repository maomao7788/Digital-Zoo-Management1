import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}
// Checks if the user is authenticated by verifying the presence of an access token.
const isAuthenticated = (): boolean => !!localStorage.getItem('access_token');
// If the user is not logged in, they will be redirected to the login page.
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
