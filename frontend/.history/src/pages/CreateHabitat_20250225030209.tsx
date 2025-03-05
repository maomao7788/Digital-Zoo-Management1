import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

interface Animal {
  id: number;
  name: string;
  species: string;
}

interface Habitat {
    id: number;
    name: string;
    size: string;
    climate: string;
    suitable_species: string[];
    animals: Animal[];  // Explicitly define animals as an array of Animal
  }
const CreateHabitat = () => {
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    climate: '',
    habitatId: '' // Used to select existing habitats
  });

const [habitats, setHabitats] = useState<Habitat[]>([]);  // Explicitly define type for habitats
const [animals, setAnimals] = useState<Animal[]>([]);  // Explicitly define type for animals

  // Submit form data
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
          {/* Habitat Information */}
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <TextField
            label="Size"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            required
          />
          <TextField
            label="Climate"
            value={formData.climate}
            onChange={(e) => setFormData({ ...formData, climate: e.target.value })}
            required
          />
          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary">Create Habitat</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateHabitat;
