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
import ZookeeperPage from './pages/ZookeeperPage';
import CareRoutinePage from './pages/CareRoutinePage';
import ActivityLogPage from './pages/ActivityLogPage';
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
          <Link href="/habitats" color="inherit" underline="none" sx={{ mr: 2 }}>Habitats</Link>
          <Link href="/create-habitat" color="inherit" underline="none" sx={{ mr: 2 }}>Create Habitat</Link>
          <Link to="/zookeepers">Zookeepers</Link>
          <Link to="/care-routines">Care Routines</Link>
          <Link to="/activity-logs">Activity Logs</Link>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><AnimalList /></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><CreateAnimal /></PrivateRoute>} />
        <Route path="/edit/:id" element={<EditAnimal />} />
        <Route path="/habitats" element={<PrivateRoute><HabitatList /></PrivateRoute>} />
        <Route path="/create-habitat" element={<PrivateRoute><CreateHabitat /></PrivateRoute>} />
        <Route path="/edit-habitat/:id" element={<PrivateRoute><EditHabitat /></PrivateRoute>} />
        <Route path="/zookeepers" element={<ZookeeperPage />} />
        <Route path="/care-routines" element={<CareRoutinePage />} />
        <Route path="/activity-logs" element={<ActivityLogPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
