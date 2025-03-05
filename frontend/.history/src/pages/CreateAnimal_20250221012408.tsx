import React, { useState } from 'react';
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

const CreateAnimal = () => {
  const [formData, setFormData] = useState({
    species: '',
    diet: 'Carnivore',
    lifespan: 0,
    behaviour: '',
    habitat: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/animals/', formData)
      .then(() => alert('Animal created successfully!'))
      .catch(err => alert(`Error: ${err.response.data.detail || 'Unknown error'}`));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Create New Animal
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Species"
          fullWidth
          margin="normal"
          value={formData.species}
          onChange={e => setFormData({...formData, species: e.target.value})}
          required
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Diet Type</InputLabel>
          <Select
            value={formData.diet}
            onChange={e => setFormData({...formData, diet: e.target.value})}
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
          onChange={e => setFormData({...formData, lifespan: Number(e.target.value)})}
          required
        />

        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};
export default AnimalList;