import React, { useState, useEffect } from 'react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAnimal(formData);
      alert('Animal created successfully!');
    } catch (err) {
      console.error('Error creating animal:', err);
      alert('Failed to create animal.');
    }
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
          <Button variant="contained" color="primary" type="submit">Submit</Button>
        </Box>
      </Paper>
    </Container>
  );
};
export default CreateAnimal;