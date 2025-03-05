import React, { useEffect, useState } from 'react';
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
  Button,
  Container
} from '@mui/material';
import { getAnimals, deleteAnimal } from '../services/api';

interface Habitat {
  id: number;
  name: string;
}

interface Animal {
  id: number;
  name: string;
  species: string;
  diet: string;
  lifespan: number;
  behaviour: string;
  habitat: Habitat | null;
}

const AnimalList = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadAnimals();
  }, []);

  const loadAnimals = async () => {
    try {
      const res = await getAnimals();
      setAnimals(res.data);
    } catch (err) {
      console.error('Failed to load animals:', err);
    }
  };

  const removeAnimal = async (id: number) => {
    if (window.confirm('Confirm delete?')) {
      try {
        await deleteAnimal(id);
        loadAnimals();
      } catch (err) {
        console.error('Failed to delete:', err);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Animal List</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {['Name', 'Species', 'Diet', 'Lifespan', 'Behaviour', 'Habitat', 'Actions'].map(header => (
                <TableCell key={header}>{header}</TableCell>
              ))}
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
                <TableCell>{animal.habitat?.name || 'Unassigned'}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => navigate(`/edit/${animal.id}`)}>Edit</Button>
                  <Button color="secondary" onClick={() => removeAnimal(animal.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AnimalList;
