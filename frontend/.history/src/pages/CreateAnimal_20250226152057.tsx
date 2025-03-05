import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
   Paper, 
   Box
} from '@mui/material';
import { getHabitats, createAnimal } from '../services/api';  
import { Typography } from '@mui/material';

interface Habitat {
  id: number;
  name: string;
}

const CreateAnimal = () => {
  const [formData, setFormData] = useState({
    species: '',
    name: '',
    diet: 'Carnivore',
    lifespan: 0,
    behaviour: '',
    habitat: ''
  });

  const [habitats, setHabitats] = useState<Habitat[]>([]);

  useEffect(() => {
    getHabitats()
      .then((res) => setHabitats(res.data))
      .catch((err) => console.error('Failed to fetch habitats:', err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const animalData = {
      name: formData.name,
      species: formData.species,
      diet: formData.diet,
      lifespan: formData.lifespan,
      behaviour: formData.behaviour,
      habitat: formData.habitat, // 
    };
  
    axios.post('http://localhost:8000/zoo/api/animals/', animalData)
      .then(() => alert('animal is created successful！'))
      .catch((err) => {
        console.error('fail to create animal:', err.response?.data || err.message);
        alert(`error: ${err.response?.data.detail || 'error'}`);
      });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>Create New Animal</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Name" fullWidth value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <TextField label="Species" fullWidth value={formData.species} onChange={(e) => setFormData({ ...formData, species: e.target.value })} required />
          <FormControl fullWidth>
            <InputLabel>Diet</InputLabel>
            <Select value={formData.diet} onChange={(e) => setFormData({ ...formData, diet: e.target.value })}>
              <MenuItem value="Carnivore">Carnivore</MenuItem>
              <MenuItem value="Herbivore">Herbivore</MenuItem>
              <MenuItem value="Omnivore">Omnivore</MenuItem>
            </Select>
          </FormControl>
          <TextField type="number" label="Lifespan (Years)" fullWidth value={formData.lifespan} onChange={(e) => setFormData({ ...formData, lifespan: Number(e.target.value) })} required />
          <TextField label="Behaviour" fullWidth value={formData.behaviour} onChange={(e) => setFormData({ ...formData, behaviour: e.target.value })} required />
          <FormControl fullWidth>
            <InputLabel>Habitat</InputLabel>
            <Select value={formData.habitat} onChange={(e) => setFormData({ ...formData, habitat: e.target.value })}>
              {habitats.map((habitat) => (
                <MenuItem key={habitat.id} value={habitat.id}>{habitat.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" type="submit">Submit</Button>
        </Box>
      </Paper>
    </Container>
  );
};
export default CreateAnimal;