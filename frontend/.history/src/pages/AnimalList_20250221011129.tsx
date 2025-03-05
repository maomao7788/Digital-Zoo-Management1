import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
      .catch(err => console.error(err));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>物种</TableCell>
            <TableCell>饮食</TableCell>
            <TableCell>寿命</TableCell>
            <TableCell>栖息地</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {animals.map(animal => (
            <TableRow key={animal.id}>
              <TableCell>{animal.species}</TableCell>
              <TableCell>{animal.diet}</TableCell>
              <TableCell>{animal.lifespan}年</TableCell>
              <TableCell>{animal.habitat?.name || '未分配'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};