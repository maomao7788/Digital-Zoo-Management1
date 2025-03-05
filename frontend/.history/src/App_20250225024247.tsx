import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import AnimalList from './pages/AnimalList';
import CreateAnimal from './pages/CreateAnimal';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { AppBar, Toolbar, Link, Button, Box } from '@mui/material';
import { logout } from './services/authApi';
import EditAnimal from './pages/EditAnimal';
import HabitatList from './pages/HabitatList';
import CreateHabitat from './pages/CreateHabitat';
import EditHabitat from './pages/EditHabitat';

function App() {
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          {/* Navigation Links */}
          <Link href="/" color="inherit" underline="none" sx={{ mr: 2 }}>Animals</Link>
          <Link href="/create" color="inherit" underline="none" sx={{ mr: 2 }}>Create Animal</Link>
          <Link href="/habitats" color="inherit" underline="none" sx={{ mr: 2 }}>Habitats</Link>
          <Link href="/create-habitat" color="inherit" underline="none" sx={{ mr: 2 }}>Create Habitat</Link>
          <Box sx={{ flexGrow: 1 }}></Box>
          {/* Logout Button */}
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Route Definitions */}
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />

        {/* Animal Management Routes */}
        <Route path="/" element={<PrivateRoute><AnimalList /></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><CreateAnimal /></PrivateRoute>} />
        <Route path="/edit/:id" element={<EditAnimal />} />

        {/* Habitat Management Routes */}
        <Route path="/habitats" element={<PrivateRoute><HabitatList /></PrivateRoute>} />
        <Route path="/create-habitat" element={<PrivateRoute><CreateHabitat /></PrivateRoute>} />
        <Route path="/edit-habitat/:id" element={<PrivateRoute><EditHabitat /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
