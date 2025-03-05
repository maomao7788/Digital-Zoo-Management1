import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container
} from '@mui/material';
import { getAnimalById, updateAnimal, getHabitats } from '../services/api';

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
    getAnimalById(Number(id))
      .then(res => setFormData(res.data))
      .catch(err => console.error('Failed to fetch animal:', err));

    getHabitats()
      .then(res => setHabitats(res.data))
      .catch(err => console.error('Failed to fetch habitats:', err));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAnimal(Number(id), formData);
    alert('Updated successfully.');
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Edit Animal</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" fullWidth margin="normal" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
        <FormControl fullWidth margin="normal">
          <InputLabel>Habitat</InputLabel>
          <Select value={formData.habitat} onChange={e => setFormData({ ...formData, habitat: e.target.value })}>
            {habitats.map(h => <MenuItem key={h.id} value={h.id}>{h.name}</MenuItem>)}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained">Update</Button>
      </form>
    </Container>
  );
};

export default EditAnimal;
