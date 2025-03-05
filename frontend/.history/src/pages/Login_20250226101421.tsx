import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, TextField, Button } from '@mui/material';
import { login } from '../services/authApi';
  // State for username and password input fields
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token && token !== 'null' && token !== 'undefined') {
      navigate('/'); 
    }
  }, [navigate]);
//  handle login:authenticate,store tokens,redirect
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      alert('Login successful!');
      navigate('/'); 
    } catch (error: any) { 
      console.error('Login failed:', error.response ? error.response.data : error.message);
      alert(`Login failed: ${error.response?.data.detail || 'Unknown error'}`);
    }
  };
  

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Login</Typography>
      {/* login form */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
