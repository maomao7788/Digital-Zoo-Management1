import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, TextField, Button, Snackbar, Alert } from '@mui/material';
import { login } from '../services/authApi';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/');
    }
  }, [navigate]);
//  handle login:authenticate,store tokens,redirect
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const response = await login(username, password);
  //     localStorage.setItem('access_token', response.data.access);
  //     localStorage.setItem('refresh_token', response.data.refresh);
  //     setOpenSnackbar(true);
  //     setTimeout(() => navigate('/'), 1500);
  //   } catch (error) { 
  //     if (error instanceof Error && 'response' in error) {
  //       setErrorMessage((error as any).response?.data.detail || 'Login failed');
  //     } else {
  //       setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
  //     }
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ username, password }); 
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      setOpenSnackbar(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (error) { 
      if (error instanceof Error && 'response' in error) {
        setErrorMessage((error as any).response?.data.detail || 'Login failed');
      } else {
        setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    }
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Welcome to Digital Zoo Management</Typography>
         {/* login form */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>

      {errorMessage && <Typography color="error" sx={{ mt: 2 }}>{errorMessage}</Typography>}

      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="success">Login successful! Redirecting...</Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
