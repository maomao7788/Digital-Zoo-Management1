import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHabitats, updateHabitat } from '../services/api';
import {
  Container, TextField, Button, Typography, Paper, Box
} from '@mui/material';

const EditHabitat = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    climate: '',
    suitable_species: ''
  });

  useEffect(() => {
    getHabitats().then((res) => {
      const habitat = res.data.find((h: any) => h.id === parseInt(id || '0'));
      if (habitat) {
        setFormData({
          name: habitat.name,
          size: habitat.size,
          climate: habitat.climate,
          suitable_species: habitat.suitable_species.join(', ')
        });
      }
    });
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      updateHabitat(parseInt(id), formData) // Convert string to number
        .then(() => {
          alert('Habitat updated successfully!');
          navigate('/habitats');
        });
    } else {
      alert('Invalid ID for habitat');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>Edit Habitat</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <TextField label="Size" value={formData.size} onChange={(e) => setFormData({ ...formData, size: e.target.value })} required />
          <TextField label="Climate" value={formData.climate} onChange={(e) => setFormData({ ...formData, climate: e.target.value })} required />
          <TextField label="Suitable Species (comma-separated)" value={formData.suitable_species} onChange={(e) => setFormData({ ...formData, suitable_species: e.target.value })} required />
          <Button type="submit" variant="contained" color="primary">Update Habitat</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditHabitat;
