// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Typography, Container, TextField, Button, Snackbar, Alert } from '@mui/material';
// import { login } from '../services/authApi';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem('access_token')) {
//       navigate('/');
//     }
//   }, [navigate]);
// //  handle login:authenticate,store tokens,redirect
//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   try {
//   //     const response = await login(username, password);
//   //     localStorage.setItem('access_token', response.data.access);
//   //     localStorage.setItem('refresh_token', response.data.refresh);
//   //     setOpenSnackbar(true);
//   //     setTimeout(() => navigate('/'), 1500);
//   //   } catch (error) { 
//   //     if (error instanceof Error && 'response' in error) {
//   //       setErrorMessage((error as any).response?.data.detail || 'Login failed');
//   //     } else {
//   //       setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
//   //     }
//   //   }
//   // };
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await login( username, password ); 
//       localStorage.setItem('access_token', response.data.access);
//       localStorage.setItem('refresh_token', response.data.refresh);
//       setOpenSnackbar(true);
//       setTimeout(() => navigate('/'), 1500);
//     } catch (error) { 
//       if (error instanceof Error && 'response' in error) {
//         setErrorMessage((error as any).response?.data.detail || 'Login failed');
//       } else {
//         setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
//       }
//     }
//   };
//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4">Welcome to Digital Zoo Management</Typography>
//          {/* login form */}
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Username"
//           fullWidth
//           margin="normal"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <TextField
//           label="Password"
//           type="password"
//           fullWidth
//           margin="normal"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
//           Login
//         </Button>
//       </form>

//       {errorMessage && <Typography color="error" sx={{ mt: 2 }}>{errorMessage}</Typography>}

//       <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={() => setOpenSnackbar(false)}>
//         <Alert severity="success">Login successful! Redirecting...</Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default Login;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Typography, Container, TextField, Button, Snackbar, Alert, Link } from '@mui/material';
// import { login } from '../services/authApi';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem('access_token')) {
//       navigate('/');
//     }
//   }, [navigate]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await login(username, password);
//       localStorage.setItem('access_token', response.data.access);
//       localStorage.setItem('refresh_token', response.data.refresh);
//       setOpenSnackbar(true);
//       setTimeout(() => navigate('/'), 1500);
//     } catch (error) {
//       if (error instanceof Error && 'response' in error) {
//         setErrorMessage((error as any).response?.data.detail || 'Login failed');
//       } else {
//         setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
//       }
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" sx={{ mb: 2 }}>Welcome to Digital Zoo Management</Typography>

//       {/* Login Form */}
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Username"
//           fullWidth
//           margin="normal"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <TextField
//           label="Password"
//           type="password"
//           fullWidth
//           margin="normal"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
//           Login
//         </Button>
//       </form>

//       {errorMessage && <Typography color="error" sx={{ mt: 2 }}>{errorMessage}</Typography>}

//       <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={() => setOpenSnackbar(false)}>
//         <Alert severity="success">Login successful! Redirecting...</Alert>
//       </Snackbar>

//       {/* Register Link */}
//       <Typography sx={{ mt: 2, textAlign: 'center' }}>
//         No account? <Link onClick={() => navigate('/register')} sx={{ cursor: 'pointer' }}>register</Link>
//       </Typography>
//     </Container>
//   );
// };

// export default Login;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Typography, Container, TextField, Button, Snackbar, Alert, Link } from '@mui/material';
// import axios from 'axios';
// import { login } from '../services/authApi';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('access_token');
//     if (token) {
//       navigate('/');
//     }
//   }, [navigate]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrorMessage('');

//     try {
//       const response = await login(username, password);
//       const accessToken = response.data.access;
//       const refreshToken = response.data.refresh;

//       if (accessToken && refreshToken) {

//         localStorage.setItem('access_token', accessToken);
//         localStorage.setItem('refresh_token', refreshToken);


//         axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;


//         setOpenSnackbar(true);


//         setTimeout(() => navigate('/'), 1500);
//       } else {
//         setErrorMessage('Login response missing token');
//       }
//     } catch (error: any) {
//       if (axios.isAxiosError(error) && error.response) {
//         setErrorMessage(error.response.data.detail || 'Invalid credentials');
//       } else {
//         setErrorMessage('Network error or server unavailable');
//       }
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" sx={{ mb: 2 }}>Welcome to Digital Zoo Management</Typography>


//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Username"
//           fullWidth
//           margin="normal"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <TextField
//           label="Password"
//           type="password"
//           fullWidth
//           margin="normal"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
//           Login
//         </Button>
//       </form>

//       {errorMessage && <Typography color="error" sx={{ mt: 2 }}>{errorMessage}</Typography>}

//       <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={() => setOpenSnackbar(false)}>
//         <Alert severity="success">Login successful! Redirecting...</Alert>
//       </Snackbar>

  
//       <Typography sx={{ mt: 2, textAlign: 'center' }}>
//         No account? <Link onClick={() => navigate('/register')} sx={{ cursor: 'pointer' }}>register</Link>
//       </Typography>
//     </Container>
//   );
// };

// export default Login;

// src/pages/Login.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, TextField, Button, Snackbar, Alert, Link } from '@mui/material';
import axios from 'axios';
import API from '../services/api';
import { login } from '../services/authApi';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      // 调用登录接口，获取 JWT token
      const response = await login(username, password);
      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;

      if (accessToken && refreshToken) {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        
        // 直接设置 axios 默认 Authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // 获取当前用户信息，判断是否为管理员
        try {
          const profileResponse = await API.get('users/me/');
          // 假设后端返回的用户数据中包含 is_superuser 字段
          if (profileResponse.data.is_superuser) {
            localStorage.setItem('isAdmin', 'true');
          } else {
            localStorage.setItem('isAdmin', 'false');
          }
        } catch (profileError) {
          console.error('Failed to get user profile', profileError);
          localStorage.setItem('isAdmin', 'false');
        }

        setOpenSnackbar(true);
        setTimeout(() => navigate('/'), 1500);
      } else {
        setErrorMessage('Login response missing token');
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.detail || 'Invalid credentials');
      } else {
        setErrorMessage('Network error or server unavailable');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 2 }}>
        Welcome to Digital Zoo Management
      </Typography>

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

      {errorMessage && (
        <Typography color="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="success">Login successful! Redirecting...</Alert>
      </Snackbar>

      <Typography sx={{ mt: 2, textAlign: 'center' }}>
        No account?{' '}
        <Link onClick={() => navigate('/register')} sx={{ cursor: 'pointer' }}>
          register
        </Link>
      </Typography>
    </Container>
  );
};

export default Login;
