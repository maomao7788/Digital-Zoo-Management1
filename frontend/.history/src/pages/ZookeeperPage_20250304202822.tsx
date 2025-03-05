import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getZookeepers, createZookeeper, deleteZookeeper} from '../services/api';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';

interface User {
  id: number;
  username: string;
  email: string;
}

interface Zookeeper {
  id?: number;
  user: User;
  role: string;
  qualifications: string;
  responsibilities: string;
  email: string;
}

const ZookeeperPage: React.FC = () => {
  const [zookeepers, setZookeepers] = useState<Zookeeper[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [newZookeeper, setNewZookeeper] = useState<Zookeeper>({
    user: { id: 0, username: '', email: '' }, 
    role: '',
    qualifications: '',
    responsibilities: '',
    email: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadZookeepers();
    loadUsers();
  }, []);

  // 加载 Zookeeper
  const loadZookeepers = async () => {
    try {
      const response = await getZookeepers();
      setZookeepers(response.data);
    } catch (error) {
      console.error('Error fetching zookeepers:', error);
    }
  };

  // 获取用户列表
  const loadUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/zoo/api/users/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  const handleUserChange = (e: SelectChangeEvent<number>) => {
    const selectedUserId = Number(e.target.value);
    const selectedUser = users.find((user) => user.id === selectedUserId);
    if (selectedUser) {
      setNewZookeeper((prev) => ({
        ...prev,
        user: selectedUser, // ✅ 直接填充 User
        email: selectedUser.email, // ✅ 自动填充 email
      }));
    }
  };

  // 处理创建 Zookeeper
  const handleCreateZookeeper = async () => {
    try {
      if (!newZookeeper.user || typeof newZookeeper.user.id !== "number" || newZookeeper.user.id <= 0) {
        alert("Please select a valid user!");
        return;
      }
      await createZookeeper({
        user: newZookeeper.user.id, 
        role: newZookeeper.role,
        qualifications: newZookeeper.qualifications,
        responsibilities: newZookeeper.responsibilities,
        email: newZookeeper.email, // ✅ 直接使用 User 的 email
      });
      loadZookeepers();
    } catch (error) {
      console.error('Error creating zookeeper:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Zookeeper List
      </Typography>
      <div>
        <Select
  value={newZookeeper.user.id || ""} 
  onChange={handleUserChange} 
  displayEmpty
  style={{ marginRight: 10, minWidth: 200 }}
>
  <MenuItem value="">Select a User</MenuItem>
  {users.map((user) => (
    <MenuItem key={user.id} value={user.id}>{user.username}</MenuItem>
  ))}
</Select>


        <TextField label="Email" value={newZookeeper.email} disabled />
        <TextField label="Role" value={newZookeeper.role} onChange={(e) => setNewZookeeper({ ...newZookeeper, role: e.target.value })} />
        <TextField label="Qualifications" value={newZookeeper.qualifications} onChange={(e) => setNewZookeeper({ ...newZookeeper, qualifications: e.target.value })} />
        <TextField label="Responsibilities" value={newZookeeper.responsibilities} onChange={(e) => setNewZookeeper({ ...newZookeeper, responsibilities: e.target.value })} />
        <Button variant="contained" color="primary" onClick={handleCreateZookeeper} style={{ marginLeft: 10 }}>
          Create Zookeeper
        </Button>
      </div>
      
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Zookeeper Name</TableCell> 
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Qualifications</TableCell>
              <TableCell>Responsibilities</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {zookeepers.map(zookeeper => (
              <TableRow key={zookeeper.id}>
                <TableCell>{zookeeper.user.username}</TableCell> 
                <TableCell>{zookeeper.user.email}</TableCell>
                <TableCell>{zookeeper.role}</TableCell>
                <TableCell>{zookeeper.qualifications}</TableCell>
                <TableCell>{zookeeper.responsibilities}</TableCell>
                <TableCell>
                  <Button  onClick={() => navigate(`/edit-zookeeper/${zookeeper.id}`)}>Edit</Button>
                  <Button  onClick={() => deleteZookeeper(zookeeper.id!)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ZookeeperPage;
