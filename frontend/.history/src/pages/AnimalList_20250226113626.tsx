import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';

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
  habitat: number | null; 
}

const AnimalList = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [habitats, setHabitats] = useState<Habitat[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/zoo/api/animals/')
      .then((res) => setAnimals(res.data))
      .catch((err) => console.error('Failed to fetch animals:', err));


    axios.get('http://localhost:8000/zoo/api/habitats/')
      .then((res) => setHabitats(res.data))
      .catch((err) => console.error('Failed to fetch habitats:', err));
  }, []);

  const getHabitatName = (habitatId: number | null) => {
    if (!habitatId) return 'Unassigned';
    const habitat = habitats.find((h) => h.id === habitatId);
    return habitat ? habitat.name : 'Unassigned';
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
            </TableRow>
          </TableHead>
          <TableBody>
            {animals.map((animal) => (
              <TableRow key={animal.id}>
                <TableCell>{animal.name}</TableCell>
                <TableCell>{animal.species}</TableCell>
                <TableCell>{animal.diet}</TableCell>
                <TableCell>{animal.lifespan}</TableCell>
                <TableCell>{animal.behaviour}</TableCell>
                <TableCell>{getHabitatName(animal.habitat)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AnimalList;
