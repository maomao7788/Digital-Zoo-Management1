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

interface Animal {
  id: number;
  species: string;
  diet: string;
  lifespan: number;
  behaviour: string;
  habitat: { name: string } | null;
}

const AnimalList = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/animals/')
      .then(res => setAnimals(res.data))
      .catch(err => console.error('Failed to fetch animals:', err));
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Animal List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Species</TableCell>
              <TableCell>Diet</TableCell>
              <TableCell>Lifespan (Years)</TableCell>
              <TableCell>Habitat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {animals.map(animal => (
              <TableRow key={animal.id}>
                <TableCell>{animal.species}</TableCell>
                <TableCell>{animal.diet}</TableCell>
                <TableCell>{animal.lifespan}</TableCell>
                <TableCell>{animal.habitat?.name || 'Unassigned'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};