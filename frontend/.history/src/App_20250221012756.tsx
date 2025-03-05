import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnimalList from './pages/AnimalList';
import CreateAnimal from './pages/CreateAnimal';
import { AppBar, Toolbar, Link } from '@mui/material';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" color="inherit" underline="none" sx={{ mr: 2 }}>Animals</Link>
          <Link href="/create" color="inherit" underline="none">Create Animal</Link>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<AnimalList />} />
        <Route path="/create" element={<CreateAnimal />} />
      </Routes>
    </Router>
  );
}
export default App;