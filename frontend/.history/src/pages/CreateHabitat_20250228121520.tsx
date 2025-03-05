import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from '@mui/material';

interface Animal {
  id: number;
  name: string;
  species: string;
}

interface Habitat {
    id: number;
    name: string;
    size: number;
    climate: string;
    suitable_species: string[];
    animals: Animal[];  
  }
const CreateHabitat = () => {
  const [formData, setFormData] = useState({
    name: '',
    size: 0,
    climate: '',
    habitatId: '' 
  });

const [habitats, setHabitats] = useState<Habitat[]>([]);  
const [animals, setAnimals] = useState<Animal[]>([]); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const habitatData = {
      name: formData.name,
      size: formData.size,
      climate: formData.climate
    };

    axios.post('http://localhost:8000/zoo/api/habitats/', habitatData)
      .then(() => alert('Habitat created successfully!'))
      .catch(() => alert('Failed to create habitat.'));
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>Create New Habitat</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <TextField type="number" label="Size(km^2)" fullWidth value={formData.size} onChange={(e) => setFormData({ ...formData, size: Number(e.target.value) })} required />
          <TextField
            label="Climate"
            value={formData.climate}
            onChange={(e) => setFormData({ ...formData, climate: e.target.value })}
            required
          />
          <Button type="submit" variant="contained" color="primary">Create Habitat</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateHabitat;
