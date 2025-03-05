import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnimalList from './pages/AnimalList';
import CreateAnimal from './pages/CreateAnimal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnimalList />} />
        <Route path="/create" element={<CreateAnimal />} />
      </Routes>
    </Router>
  );
}