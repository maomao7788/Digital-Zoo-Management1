import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const isAuthenticated = (): boolean => !!localStorage.getItem('access_token');

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
