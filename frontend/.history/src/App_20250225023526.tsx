import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import AnimalList from './pages/AnimalList';
import CreateAnimal from './pages/CreateAnimal';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { AppBar, Toolbar,  Button ,Typography, Container  } from '@mui/material';
import { logout } from './services/authApi';
import EditAnimal from './pages/EditAnimal';
import CreateHabitat from './pages/CreateHabitat';
import EditHabitat from './pages/EditHabitat';
function App() {
  const handleLogout = () => {
    logout();
    window.location.href = '/login'; 
  };

  return (
    <Router>
      <AppBar position="static" sx={{ backgroundColor: '#4CAF50' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Virtual Safari Management
          </Typography>
          <Button color="inherit" href="/">Animals</Button>
          <Button color="inherit" href="/create-animal">Add Animal</Button>
          <Button color="inherit" href="/habitats">Habitats</Button>
          <Button color="inherit" href="/create-habitat">Add Habitat</Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Routes>
          {/* Animal Management Routes */}
          <Route path="/" element={<AnimalList />} />
          <Route path="/create-animal" element={<CreateAnimal />} />
          <Route path="/edit-animal/:id" element={<EditAnimal />} />

          {/* Habitat Management Routes */}
          <Route path="/habitats" element={<HabitatList />} />
          <Route path="/create-habitat" element={<CreateHabitat />} />
          <Route path="/edit-habitat/:id" element={<EditHabitat />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
