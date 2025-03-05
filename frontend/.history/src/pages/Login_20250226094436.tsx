import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, TextField, Button, Snackbar, Alert } from '@mui/material';
import { login } from '../services/authApi';

const Login = () => {
  // State for username and password inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // State for error messages
  const [error, setError] = useState<string | null>(null);

  // State to manage success notification
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Hook for navigation
  const navigate = useNavigate();

  /**
   * Redirects to the home page if the user is already logged in.
   */
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/');
    }
  }, [navigate]);

  /**
   * Handles input changes dynamically for both username and password fields.
   * @param {React.Dispatch<React.SetStateAction<string>>} setter - State setter function
   * @returns {function} Input change event handler
   */
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => setter(e.target.value);

  /**
   * Handles form submission for user login.
   * - Calls the login API with the provided credentials.
   * - Stores the access and refresh tokens if login is successful.
   * - Displays an error message if login fails.
   * @param {React.FormEvent} e - form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      
      // store tokens 
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      // success message and redirect
      setOpenSnackbar(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (error: any) {
      setError(error.response?.data.detail || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Login</Typography>

      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        <TextField 
          label="Username" 
          fullWidth 
          margin="normal" 
          value={username} 
          onChange={handleInputChange(setUsername)} 
          required 
        />
        <TextField 
          label="Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          value={password} 
          onChange={handleInputChange(setPassword)} 
          required 
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
      
      {/* Error  Notification  */}
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

       {/* Success Notification  */}
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="success">Login successful! Redirecting...</Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
