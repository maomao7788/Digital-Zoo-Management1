import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHabitats, deleteHabitat } from '../services/api';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, List, ListItem, ListItemText
} from '@mui/material';



interface Animal {
    id: number;
    name: string;
    species: string;
    diet: string;
    behaviour: string;
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
    fetchHabitats();
  }, []);

  const fetchHabitats = () => {
    getHabitats()
      .then((res) => setHabitats(res.data))
      .catch((err) => console.error('Failed to fetch habitats:', err));
  };

  const handleDeleteHabitat = (id: number): void => {
    if (window.confirm('Are you sure you want to delete this habitat?')) {
      deleteHabitat(id)
        .then(() => {
          alert('Habitat deleted successfully!');
          fetchHabitats(); // Refresh the list after deletion
        })
        .catch((err) => console.error('Failed to delete habitat:', err));
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Habitat List</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Climate</TableCell>
              <TableCell>Suitable Species</TableCell>
              <TableCell>Animals in Habitat</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {habitats.map((habitat) => (
              <TableRow key={habitat.id}>
                <TableCell>{habitat.name}</TableCell>
                <TableCell>{habitat.size}</TableCell>
                <TableCell>{habitat.climate}</TableCell>
                <TableCell>{Array.isArray(habitat.suitable_species) ? habitat.suitable_species.join(', '): 'No species defined'}</TableCell>
                <TableCell>{typeof habitat.suitable_species === 'string'? habitat.suitable_species: Array.isArray(habitat.suitable_species)? habitat.suitable_species.join(', '): 'No species defined'}</TableCell>
                <TableCell>
                  {habitat.animals && habitat.animals.length > 0 ? (
                    <List dense>
                      {habitat.animals.map((animal) => (
                        <ListItem key={animal.id}>
                          <ListItemText primary={`Name: ${animal.name} | Species: ${animal.species}`} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    'No animals assigned'
                  )}
                </TableCell>
                <TableCell>
                  <Button onClick={() => navigate(`/edit-habitat/${habitat.id}`)}>Edit</Button>
                  <Button color="error" onClick={() => handleDeleteHabitat(habitat.id)}>Delete</Button>
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
