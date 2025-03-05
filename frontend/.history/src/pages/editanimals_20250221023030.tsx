import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Typography
} from '@mui/material';

interface Habitat {
  id: number;
  name: string;
}

const EditAnimal = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    species: '',
    diet: 'Carnivore',
    lifespan: 0,
    behaviour: '',
    habitat: ''
  });

  const [habitats, setHabitats] = useState<Habitat[]>([]);
  useEffect(() => {
    axios.get(`http://localhost:8000/zoo/api/animals/${id}/`)
      .then(res => setFormData(res.data))
      .catch(err => console.error('Failed to fetch animal data:', err));

    axios.get('http://localhost:8000/zoo/api/habitats/')
      .then(res => setHabitats(res.data))
      .catch(err => console.error('Failed to fetch habitats:', err));
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/zoo/api/animals/${id}/`, formData)
      .then(() => {
        alert('Animal updated successfully!');
        navigate('/');
      })
      .catch(err => console.error('Failed to update animal:', err));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Edit Animal
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <TextField
          label="Species"
          fullWidth
          margin="normal"
          value={formData.species}
          onChange={e => setFormData({ ...formData, species: e.target.value })}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Diet Type</InputLabel>
          <Select
            value={formData.diet}
            onChange={e => setFormData({ ...formData, diet: e.target.value })}
          >
            <MenuItem value="Carnivore">Carnivore</MenuItem>
            <MenuItem value="Herbivore">Herbivore</MenuItem>
            <MenuItem value="Omnivore">Omnivore</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Lifespan (Years)"
          type="number"
          fullWidth
          margin="normal"
          value={formData.lifespan}
          onChange={e => setFormData({ ...formData, lifespan: Number(e.target.value) })}
          required
        />
        <TextField
          label="Behaviour"
          fullWidth
          margin="normal"
          value={formData.behaviour}
          onChange={e => setFormData({ ...formData, behaviour: e.target.value })}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Habitat</InputLabel>
          <Select
            value={formData.habitat}
            onChange={e => setFormData({ ...formData, habitat: e.target.value })}
          >
            {habitats.map(habitat => (
              <MenuItem key={habitat.id} value={habitat.id}>{habitat.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Update Animal
        </Button>
      </form>
    </Container>
  );
};
export default EditAnimals;
