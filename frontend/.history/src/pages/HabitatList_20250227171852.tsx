import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  const navigate = useNavigate();

  useEffect(() => {
    loadHabitats();
  }, []);

  const loadHabitats = async () => {
    try {
      const res = await axios.get('http://localhost:8000/zoo/api/habitats/');
      setHabitats(res.data);
    } catch (err) {
      console.error('Error fetching habitats:', err);
    }
  };

  const removeHabitat = async (id: number) => {
    if (window.confirm('Confirm delete?')) {
      try {
        await axios.delete(`http://localhost:8000/zoo/api/habitats/${id}/`);
        loadHabitats();
      } catch (err) {
        console.error('Error deleting habitat:', err);
      }
    }
  };

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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {habitats.map(habitat => (
              <TableRow key={habitat.id}>
                <TableCell>{habitat.name}</TableCell>
                <TableCell>{habitat.size}</TableCell>
                <TableCell>{habitat.climate}</TableCell>
                <TableCell>
                  {Array.isArray(habitat.suitable_species) && habitat.suitable_species.length > 0
                    ? habitat.suitable_species.join(', ')
                    : ' '}
                </TableCell>
                <TableCell>
                  {habitat.animals && habitat.animals.length > 0 ? (
                    <ul>
                      {habitat.animals.map(animal => (
                        <li key={animal.id}>
                          {animal.name} ({animal.species})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ' '
                  )}
                </TableCell>
                <TableCell>
                  <Button onClick={() => navigate(`/edit/${habitat.id}`)}>Edit</Button>
                  <Button onClick={() => removeHabitat(habitat.id)}>Delete</Button>
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