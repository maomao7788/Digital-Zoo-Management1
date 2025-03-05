import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AnimalList from './pages/AnimalList';
import CreateAnimal from './pages/CreateAnimal';
import EditAnimal from './pages/EditAnimal';  
import { AppBar, Toolbar, Link } from '@mui/material';
import ZookeeperList from './pages/ZookeeperList';
import AssignCareRoutine from './pages/AssignCareRoutine';
import ActivityLog from './pages/ActivityLog';
function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" color="inherit" underline="none" sx={{ mr: 2 }}>Animals</Link>
          <Link href="/create" color="inherit" underline="none">Create Animal</Link>
          <Link href="/zookeepers" color="inherit" underline="none" sx={{ mr: 2 }}>Zookeepers</Link>
          <Link href="/assign" color="inherit" underline="none" sx={{ mr: 2 }}>Assign Care</Link>
          <Link href="/logs" color="inherit" underline="none">Activity Logs</Link>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<AnimalList />} />
        <Route path="/create" element={<CreateAnimal />} />
        <Route path="/edit/:id" element={<EditAnimal />} />  
        <Route path="/zookeepers" element={<ZookeeperList />} />
        <Route path="/assign" element={<AssignCareRoutine />} />
        <Route path="/logs" element={<ActivityLog />} />
      </Routes>
    </Router>
    
  );
  
}
export default App;
