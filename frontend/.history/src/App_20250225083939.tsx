import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import AnimalList from './pages/AnimalList';
import CreateAnimal from './pages/CreateAnimal';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { AppBar, Toolbar, Link, Button ,Box } from '@mui/material';
import { logout } from './services/authApi';
import EditAnimal from './pages/EditAnimal';

function App() {
  const handleLogout = () => {
    logout();
    window.location.href = '/login'; 
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" color="inherit" underline="none" sx={{ mr: 2 }}>Animals</Link>
          <Link href="/create" color="inherit" underline="none" sx={{ mr: 2 }}>Create Animal</Link>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button color="inherit" onClick={handleLogout}>Logout</Button> 
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><AnimalList /></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><CreateAnimal /></PrivateRoute>} />
        <Route path="/edit/:id" element={<EditAnimal />} /> 
      </Routes>
    </Router>
  );
}

export default App;
