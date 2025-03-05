import React, { useState } from 'react';
import { createHabitat } from '../services/api';
import {
  Container, TextField, Button, Typography, Paper, Box
} from '@mui/material';

const CreateHabitat = () => {
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    climate: '',
    suitable_species: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      suitable_species: formData.suitable_species.split(',').map(species => species.trim()),
    };
    createHabitat(formattedData)
      .then(() => alert('Habitat created successfully!'))
      .catch(() => alert('Failed to create habitat.'));
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>Create New Habitat</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <TextField label="Size" value={formData.size} onChange={(e) => setFormData({ ...formData, size: e.target.value })} required />
          <TextField label="Climate" value={formData.climate} onChange={(e) => setFormData({ ...formData, climate: e.target.value })} required />
          <TextField label="Suitable Species (comma-separated)" value={formData.suitable_species} onChange={(e) => setFormData({ ...formData, suitable_species: e.target.value })} required />
          <Button type="submit" variant="contained" color="primary">Create Habitat</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateHabitat;

