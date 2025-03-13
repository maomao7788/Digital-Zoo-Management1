// // import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// // import AnimalList from './pages/AnimalList';
// // import CreateAnimal from './pages/CreateAnimal';
// // import Login from './pages/Login';
// // import PrivateRoute from './components/PrivateRoute';
// // import { AppBar, Toolbar, Link, Button, Box } from '@mui/material';
// // import { logout} from './services/authApi';
// // import EditAnimal from './pages/EditAnimal';
// // import HabitatList from './pages/HabitatList';
// // import CreateHabitat from './pages/CreateHabitat';
// // import EditHabitat from './pages/EditHabitat';
// // import EditZookeeper from './pages/EditZookeeper';
// // import ZookeeperPage from './pages/ZookeeperPage';
// // import CareRoutinePage from './pages/CareRoutinePage';
// // import ActivityLogPage from './pages/ActivityLogPage';
// // import TaskList from './pages/TaskList';
// // import { Link as RouterLink } from 'react-router-dom';
// // import Register from './pages/Register';
// // import ApplyMembership from './pages/ApplyMembership';


// // function App() {
// //   const handleLogout = () => {
// //     logout();
// //     window.location.href = '/login';
// //   };

// //   return (
// //     <Router>
// //       <AppBar position="static">
// //         <Toolbar>
// //           <Link href="/" color="inherit" underline="none" sx={{ mr: 2 }}>Animals</Link>
// //           <Link href="/create" color="inherit" underline="none" sx={{ mr: 2 }}>Create Animal</Link>
// //           <Link href="/habitats" color="inherit" underline="none" sx={{ mr: 2 }}>Habitats</Link>
// //           <Link href="/create-habitat" color="inherit" underline="none" sx={{ mr: 2 }}>Create Habitat</Link>
// //           <Link component={RouterLink} to="/zookeepers" color="inherit" underline="none" sx={{ mr: 2 }}>Zookeepers</Link>
// //           <Link component={RouterLink} to="/care_routines" color="inherit" underline="none" sx={{ mr: 2 }}>Care Routines</Link>
// //           <Link component={RouterLink} to="/activity_logs" color="inherit" underline="none" sx={{ mr: 2 }}>Activity Logs</Link>
// //           <Link component={RouterLink} to="/task-list" color="inherit" underline="none" sx={{ mr: 2 }}>Task List</Link>

// //           <Box sx={{ flexGrow: 1 }}></Box>
// //           <Button color="inherit" onClick={handleLogout}>Logout</Button>
// //         </Toolbar>
// //       </AppBar>

// //       <Routes>
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/" element={<PrivateRoute><AnimalList /></PrivateRoute>} />
// //         <Route path="/create" element={<PrivateRoute><CreateAnimal /></PrivateRoute>} />
// //         <Route path="/edit/:id" element={<EditAnimal />} />
// //         <Route path="/habitats" element={<PrivateRoute><HabitatList /></PrivateRoute>} />
// //         <Route path="/create-habitat" element={<PrivateRoute><CreateHabitat /></PrivateRoute>} />
// //         <Route path="/edit-habitat/:id" element={<PrivateRoute><EditHabitat /></PrivateRoute>} />
// //         <Route path="/zookeepers" element={<ZookeeperPage />} />
// //         <Route path="/care_routines" element={<CareRoutinePage />} />
// //         <Route path="/activity_logs" element={<ActivityLogPage />} />
// //         <Route path="/edit-zookeeper/:id" element={<EditZookeeper />} />
// //         <Route path="/task-list" element={<TaskList />} />

        
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;



// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import AnimalList from './pages/AnimalList';
// import CreateAnimal from './pages/CreateAnimal';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import ApplyMembership from './pages/ApplyMembership';
// import PrivateRoute from './components/PrivateRoute';
// import { AppBar, Toolbar, Link, Button, Box } from '@mui/material';
// import { logout } from './services/authApi';
// import { Link as RouterLink } from 'react-router-dom';
// import EditAnimal from './pages/EditAnimal';
// import HabitatList from './pages/HabitatList';
// import CreateHabitat from './pages/CreateHabitat';
// import EditHabitat from './pages/EditHabitat';
// import EditZookeeper from './pages/EditZookeeper';
// import ZookeeperPage from './pages/ZookeeperPage';
// import CareRoutinePage from './pages/CareRoutinePage';
// import ActivityLogPage from './pages/ActivityLogPage';
// import TaskList from './pages/TaskList';

// function App() {
//   const handleLogout = () => {
//     logout();
//     window.location.href = '/login';
//   };

//   return (
//     <Router>
//       <AppBar position="static">
//         <Toolbar>
//           <Link href="/" color="inherit" underline="none" sx={{ mr: 2 }}>Animals</Link>
//           <Link href="/create" color="inherit" underline="none" sx={{ mr: 2 }}>Create Animal</Link>
//           <Link href="/habitats" color="inherit" underline="none" sx={{ mr: 2 }}>Habitats</Link>
//           <Link href="/create-habitat" color="inherit" underline="none" sx={{ mr: 2 }}>Create Habitat</Link>
//           <Link component={RouterLink} to="/zookeepers" color="inherit" underline="none" sx={{ mr: 2 }}>Zookeepers</Link>
//           <Link component={RouterLink} to="/care_routines" color="inherit" underline="none" sx={{ mr: 2 }}>Care Routines</Link>
//           <Link component={RouterLink} to="/activity_logs" color="inherit" underline="none" sx={{ mr: 2 }}>Activity Logs</Link>
//           <Link component={RouterLink} to="/task-list" color="inherit" underline="none" sx={{ mr: 2 }}>Task List</Link>
//           <Link component={RouterLink} to="/apply-membership" color="inherit" underline="none" sx={{ mr: 2 }}>Apply Membership</Link>

//           <Box sx={{ flexGrow: 1 }}></Box>
//           {/* <Link component={RouterLink} to="/register" color="inherit" underline="none" sx={{ mr: 2 }}>Register</Link> */}
//           <Button color="inherit" onClick={handleLogout}>Logout</Button>
//         </Toolbar>
//       </AppBar>

//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/apply-membership" element={<PrivateRoute><ApplyMembership /></PrivateRoute>} />
//         <Route path="/" element={<PrivateRoute><AnimalList /></PrivateRoute>} />
//         <Route path="/create" element={<PrivateRoute><CreateAnimal /></PrivateRoute>} />
//         <Route path="/edit/:id" element={<PrivateRoute><EditAnimal /></PrivateRoute>} />
//         <Route path="/habitats" element={<PrivateRoute><HabitatList /></PrivateRoute>} />
//         <Route path="/create-habitat" element={<PrivateRoute><CreateHabitat /></PrivateRoute>} />
//         <Route path="/edit-habitat/:id" element={<PrivateRoute><EditHabitat /></PrivateRoute>} />
//         <Route path="/zookeepers" element={<PrivateRoute><ZookeeperPage /></PrivateRoute>} />
//         <Route path="/care_routines" element={<PrivateRoute><CareRoutinePage /></PrivateRoute>} />
//         <Route path="/activity_logs" element={<PrivateRoute><ActivityLogPage /></PrivateRoute>} />
//         <Route path="/edit-zookeeper/:id" element={<PrivateRoute><EditZookeeper /></PrivateRoute>} />
//         <Route path="/task-list" element={<PrivateRoute><TaskList /></PrivateRoute>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminEventForm from './pages/AdminEventForm';
import AnimalList from './pages/AnimalList';
import CreateAnimal from './pages/CreateAnimal';
import Login from './pages/Login';
import Register from './pages/Register';
import ApplyMembership from './pages/ApplyMembership';
import EventList from './pages/EventList';
import EventDetail from './pages/EventDetail';
import FeedbackForm from './pages/FeedbackForm';
import PrivateRoute from './components/PrivateRoute';
import { AppBar, Toolbar, Link, Button, Box } from '@mui/material';
import { logout } from './services/authApi';
import { Link as RouterLink } from 'react-router-dom';
import EditAnimal from './pages/EditAnimal';
import HabitatList from './pages/HabitatList';
import CreateHabitat from './pages/CreateHabitat';
import EditHabitat from './pages/EditHabitat';
import ZookeeperPage from './pages/ZookeeperPage';
import CareRoutinePage from './pages/CareRoutinePage';
import ActivityLogPage from './pages/ActivityLogPage';
import TaskList from './pages/TaskList';

function App() {
  // 假设你从用户登录信息中可以判断当前用户是否是管理员
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Link component={RouterLink} to="/" color="inherit" underline="none" sx={{ mr: 2 }}>
            Animals
          </Link>
          <Link component={RouterLink} to="/create" color="inherit" underline="none" sx={{ mr: 2 }}>
            Create Animal
          </Link>
          <Link component={RouterLink} to="/habitats" color="inherit" underline="none" sx={{ mr: 2 }}>
            Habitats
          </Link>
          <Link component={RouterLink} to="/create-habitat" color="inherit" underline="none" sx={{ mr: 2 }}>
            Create Habitat
          </Link>
          <Link component={RouterLink} to="/zookeepers" color="inherit" underline="none" sx={{ mr: 2 }}>
            Zookeepers
          </Link>
          <Link component={RouterLink} to="/care_routines" color="inherit" underline="none" sx={{ mr: 2 }}>
            Care Routines
          </Link>
          <Link component={RouterLink} to="/activity_logs" color="inherit" underline="none" sx={{ mr: 2 }}>
            Activity Logs
          </Link>
          <Link component={RouterLink} to="/task-list" color="inherit" underline="none" sx={{ mr: 2 }}>
            Task List
          </Link>
          <Link component={RouterLink} to="/apply-membership" color="inherit" underline="none" sx={{ mr: 2 }}>
            Apply Membership
          </Link>
          <Link component={RouterLink} to="/events" color="inherit" underline="none" sx={{ mr: 2 }}>
            Events
          </Link>
          {/* 如果是管理员，则显示管理员页面链接 */}
          {isAdmin && (
            <Link component={RouterLink} to="/admin-event" color="inherit" underline="none" sx={{ mr: 2 }}>
              Admin Event
            </Link>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/apply-membership" element={<PrivateRoute><ApplyMembership /></PrivateRoute>} />
        <Route path="/events" element={<PrivateRoute><EventList /></PrivateRoute>} />
        <Route path="/events/:id" element={<PrivateRoute><EventDetail /></PrivateRoute>} />
        <Route path="/feedback/:id" element={<PrivateRoute><FeedbackForm /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute><AnimalList /></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><CreateAnimal /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditAnimal /></PrivateRoute>} />
        <Route path="/habitats" element={<PrivateRoute><HabitatList /></PrivateRoute>} />
        <Route path="/create-habitat" element={<PrivateRoute><CreateHabitat /></PrivateRoute>} />
        <Route path="/edit-habitat/:id" element={<PrivateRoute><EditHabitat /></PrivateRoute>} />
        <Route path="/zookeepers" element={<PrivateRoute><ZookeeperPage /></PrivateRoute>} />
        <Route path="/care_routines" element={<PrivateRoute><CareRoutinePage /></PrivateRoute>} />
        <Route path="/activity_logs" element={<PrivateRoute><ActivityLogPage /></PrivateRoute>} />
        <Route path="/task-list" element={<PrivateRoute><TaskList /></PrivateRoute>} />
        {/* 管理员专用页面 */}
        <Route path="/admin-event" element={<PrivateRoute><AdminEventForm /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
