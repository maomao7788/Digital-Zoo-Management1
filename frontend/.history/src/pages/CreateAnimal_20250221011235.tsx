import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

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
      .then(() => alert('创建成功!'))
      .catch(err => alert(`错误: ${err.response.data}`));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label=""
        value={formData.species}
        onChange={e => setFormData({...formData, species: e.target.value})}
        required
      />
      <FormControl fullWidth>
        <InputLabel>饮食类型</InputLabel>
        <Select
          value={formData.diet}
          onChange={e => setFormData({...formData, diet: e.target.value})}
        >
          <MenuItem value="Carnivore">肉食</MenuItem>
          <MenuItem value="Herbivore">草食</MenuItem>
          <MenuItem value="Omnivore">杂食</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained">提交</Button>
    </form>
  );
};