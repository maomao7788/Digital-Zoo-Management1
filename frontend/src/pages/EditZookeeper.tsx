import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getZookeeperById, updateZookeeper, getUsers } from '../services/api';
import {
  Container, TextField, Button, Typography, Paper, Box, Select, MenuItem
} from '@mui/material';

interface User {
  id: number;
  username: string;
}

const EditZookeeper = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    user: 0, 
    role: '',
    qualifications: '',
    responsibilities: '',
    email: '',
  });

  useEffect(() => {
    if (!id) {
      console.error('No ID found in URL');
      return;
    }

    getUsers().then((res) => {
      setUsers(res.data);
    }).catch((error) => console.error("Error fetching users:", error));

    getZookeeperById(parseInt(id)).then((res) => {
      const zookeeper = res.data;
      setFormData({
        user: zookeeper.user,
        role: zookeeper.role,
        qualifications: zookeeper.qualifications,
        responsibilities: zookeeper.responsibilities,
        email: zookeeper.email
      });
    }).catch((error) => {
      console.error("Error fetching Zookeeper:", error);
      alert("Failed to fetch Zookeeper data ");
    });

  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      alert("Invalid ID for Zookeeper");
      return;
    }

    try {
      await updateZookeeper(parseInt(id), formData);
      alert("Zookeeper updated successfully! ");
      navigate('/zookeepers');
    } catch (error) {
      console.error("Error updating Zookeeper:", error);
      alert("Failed to update Zookeeper ");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>Edit Zookeeper</Typography>
        {formData.user === 0 ? ( 
          <Typography>Loading...</Typography>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Select value={formData.user} disabled>
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>

            <TextField label="Role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required />
            <TextField label="Qualifications" value={formData.qualifications} onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })} required />
            <TextField label="Responsibilities" value={formData.responsibilities} onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })} required />
            <TextField label="Email" value={formData.email} disabled />

            <Button type="submit" variant="contained" color="primary">Update Zookeeper</Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default EditZookeeper;
