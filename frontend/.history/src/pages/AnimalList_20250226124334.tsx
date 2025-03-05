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
  const [habitats, setHabitats] = useState<Habitat[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetchAnimals();
    fetchHabitats();
  }, []);


  const fetchAnimals = async () => {
    try {
      const res = await axios.get('http://localhost:8000/zoo/api/animals/');
      console.log('Fetched animals:', res.data); 
    } catch (err) {
      console.error('Failed to fetch animals:', err);
    }
  };
  

  // Fetch habitats to map habitat names
  const fetchHabitats = async () => {
    try {
      const res = await axios.get('http://localhost:8000/zoo/api/habitats/');
      setHabitats(res.data);
    } catch (err) {
      console.error('Failed to fetch habitats:', err);
    }
  };

  // Delete animal
  const deleteAnimal = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this animal?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/zoo/api/animals/${id}/`);
        alert('Animal deleted successfully!');
        fetchAnimals(); // Refresh list after deletion
      } catch (err) {
        console.error('Failed to delete animal:', err);
      }
    }
  };

  // Get habitat name by ID
  const getHabitatName = (habitat: Habitat | null) => {
    if (!habitat) return 'Unassigned';
    return habitat.name;
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
                <TableCell>{getHabitatName(animal.habitat)}</TableCell>
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
