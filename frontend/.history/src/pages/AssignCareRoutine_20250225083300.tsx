import React, { useState } from 'react';
import { assignCareRoutine } from '../services/api';
import {
  Container,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Paper,
} from '@mui/material';
import { Typography } from '@mui/material';
const AssignCareRoutine = () => {
  const [formData, setFormData] = useState({
    animal: '',
    feeding_time: '',
    diet_type: 'Carnivore',
    medical_needs: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = {
      animal: Number(formData.animal),  
      feeding_time: `${formData.feeding_time}:00`,  
      diet_type: formData.diet_type,
      medical_needs: formData.medical_needs,
    };

    assignCareRoutine(formattedData)
      .then(() => alert('Care routine assigned successfully!'))
      .catch((err) => {
        console.error('Failed to assign care routine:', err);
        alert('Failed to assign care routine');
      });
  };

    return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>Assign Care Routine</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Animal ID" fullWidth value={formData.animal} onChange={(e) => setFormData({ ...formData, animal: e.target.value })} required />
          <TextField label="Feeding Time (HH:MM)" fullWidth value={formData.feeding_time} onChange={(e) => setFormData({ ...formData, feeding_time: e.target.value })} required />
          <FormControl fullWidth>
            <InputLabel>Diet Type</InputLabel>
            <Select value={formData.diet_type} onChange={(e) => setFormData({ ...formData, diet_type: e.target.value })}>
              <MenuItem value="Carnivore">Carnivore</MenuItem>
              <MenuItem value="Herbivore">Herbivore</MenuItem>
              <MenuItem value="Omnivore">Omnivore</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Medical Needs" fullWidth value={formData.medical_needs} onChange={(e) => setFormData({ ...formData, medical_needs: e.target.value })} />
          <Button variant="contained" color="primary" type="submit">Assign Care</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AssignCareRoutine;
