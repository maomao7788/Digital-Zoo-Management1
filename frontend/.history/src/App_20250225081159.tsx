import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnimalList from './pages/AnimalList';
import CreateAnimal from './pages/CreateAnimal';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { AppBar, Toolbar, Link } from '@mui/material';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" color="inherit" underline="none" sx={{ mr: 2 }}>Animals</Link>
          <Link href="/create" color="inherit" underline="none" sx={{ mr: 2 }}>Create Animal</Link>
          <Link href="/login" color="inherit" underline="none">Login</Link>
        </Toolbar>
      </AppBar>

      <Routes>

        <Route path="/login" element={<Login />} />
       <Route path="/" element={<PrivateRoute><AnimalList /></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><CreateAnimal /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
