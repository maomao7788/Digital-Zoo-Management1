import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Container, TextField, Button, Snackbar, Alert, Link } from "@mui/material";
import axios from "axios";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      await axios.post("http://127.0.0.1:8000/zoo/api/register/", formData);
      setOpenSnackbar(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 2 }}>
        Create an Account
      </Typography>

      {/* Registration Form */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </form>

      {errorMessage && <Typography color="error" sx={{ mt: 2 }}>{errorMessage}</Typography>}

      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="success">Registration successful! Redirecting...</Alert>
      </Snackbar>

      {/* Login Redirect */}
      <Typography sx={{ mt: 2, textAlign: "center" }}>
        Already have an account?{" "}
        <Link onClick={() => navigate("/login")} sx={{ cursor: "pointer" }}>
          Log in
        </Link>
      </Typography>
    </Container>
  );
};

export default Register;

// import React, { useState } from "react";
// import { registerUser } from "../services/api";
// import { useNavigate } from "react-router-dom";

// const Register: React.FC = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     try {
//       await registerUser(formData);
//       alert("注册成功，请登录！");
//       navigate("/login");
//     } catch (error) {
//       setError("注册失败，请检查输入信息。");
//     }
//   };

//   return (
//     <div>
//       <h2>用户注册</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="username" placeholder="用户名" onChange={handleChange} required />
//         <input type="email" name="email" placeholder="邮箱" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="密码" onChange={handleChange} required />
//         <button type="submit">注册</button>
//       </form>
//     </div>
//   );
// };

// export default Register;