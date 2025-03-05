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
  name: string;
  species: string;
}

interface Habitat {
  id: number;
  name: string;
  size: string;
  climate: string;
  suitable_species: string[];
  animals: Animal[];
}

const HabitatList = () => {
  const [habitats, setHabitats] = useState<Habitat[]>([]);
  useEffect(() => {
    axios.get('http://localhost:8000/zoo/api/habitats/')
      .then((res) => setHabitats(res.data))
      .catch((err) => {
        console.error('Error fetching habitats:', err.message);
      });
  }, []);


  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Habitat List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Habitat Name</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Climate</TableCell>
              <TableCell>Suitable Species</TableCell>
              <TableCell>Animals in Habitat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {habitats.map((habitat) => (
              <TableRow key={habitat.id}>
                <TableCell>{habitat.name}</TableCell>
                <TableCell>{habitat.size}</TableCell>
                <TableCell>{habitat.climate}</TableCell>
                <TableCell>
                  {Array.isArray(habitat.suitable_species) && habitat.suitable_species.length > 0
                    ? habitat.suitable_species.join(', ')
                    : 'No suitable species'}
                </TableCell>
                <TableCell>
                  {habitat.animals && habitat.animals.length > 0 ? (
                    <ul>
                      {habitat.animals.map((animal) => (
                        <li key={animal.id}>
                          {animal.name} ({animal.species})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    'No animals assigned'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HabitatList;
