import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button
} from '@mui/material';

interface Animal {
  id: number;
  name: string;
  species: string;
  diet: string;
  lifespan: number;
  behaviour: string;
  habitat: { id: number; name: string } | null; // 确保 `habitat` 是对象
}

const AnimalList = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = () => {
    axios.get('http://localhost:8000/zoo/api/animals/')
      .then(res => setAnimals(res.data))
      .catch(err => console.error('Failed to fetch animals:', err));
  };

  const deleteAnimal = (id: number) => {
    if (window.confirm('Are you sure you want to delete this animal?')) {
      axios.delete(`http://localhost:8000/zoo/api/animals/${id}/`)
        .then(() => {
          alert('Animal deleted successfully!');
          fetchAnimals(); 
        })
        .catch(err => console.error('Failed to delete animal:', err));
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Animal List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Species</TableCell>
              <TableCell>Diet</TableCell>
              <TableCell>Lifespan (Years)</TableCell>
              <TableCell>Behaviour</TableCell>
              <TableCell>Habitat</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {animals.map(animal => (
              <TableRow key={animal.id}>
                <TableCell>{animal.name}</TableCell>
                <TableCell>{animal.species}</TableCell>
                <TableCell>{animal.diet}</TableCell>
                <TableCell>{animal.lifespan}</TableCell>
                <TableCell>{animal.behaviour}</TableCell>
                <TableCell>{animal.habitat ? animal.habitat.name : 'Unassigned'}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => navigate(`/edit/${animal.id}`)}>Edit</Button>
                  <Button color="secondary" onClick={() => deleteAnimal(animal.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AnimalList;
