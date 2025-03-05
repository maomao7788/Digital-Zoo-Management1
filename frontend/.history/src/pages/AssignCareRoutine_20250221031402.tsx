import React, { useEffect, useState } from 'react';
import { assignCareRoutine, getZookeepers } from '../services/api';
import { Container, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const AssignCareRoutine = () => {
  const [formData, setFormData] = useState({
    animal: '',
    feeding_time: '',
    diet_type: 'Carnivore',
    medical_needs: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    assignCareRoutine(formData)
      .then(() => alert('Care routine assigned successfully!'))
      .catch((err) => console.error('Failed to assign care routine:', err));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Assign Care Routine</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Animal ID"
          fullWidth
          margin="normal"
          value={formData.animal}
          onChange={(e) => setFormData({ ...formData, animal: e.target.value })}
          required
        />
        <TextField
          label="Feeding Time (HH:MM)"
          fullWidth
          margin="normal"
          value={formData.feeding_time}
          onChange={(e) => setFormData({ ...formData, feeding_time: e.target.value })}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Diet Type</InputLabel>
          <Select
            value={formData.diet_type}
            onChange={(e) => setFormData({ ...formData, diet_type: e.target.value })}
          >
            <MenuItem value="Carnivore">Carnivore</MenuItem>
            <MenuItem value="Herbivore">Herbivore</MenuItem>
            <MenuItem value="Omnivore">Omnivore</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Medical Needs"
          fullWidth
          margin="normal"
          value={formData.medical_needs}
          onChange={(e) => setFormData({ ...formData, medical_needs: e.target.value })}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Assign Care</Button>
      </form>
    </Container>
  );
};

export default AssignCareRoutine;