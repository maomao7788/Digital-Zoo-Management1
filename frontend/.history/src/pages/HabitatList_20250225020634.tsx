import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHabitats, deleteHabitat } from '../services/api';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography
} from '@mui/material';

const HabitatList = () => {
  const [habitats, setHabitats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHabitats();
  }, []);

  const fetchHabitats = () => {
    getHabitats()
      .then((res) => setHabitats(res.data))
      .catch((err) => console.error('Failed to fetch habitats:', err));
  };

  const handleDeleteHabitat = (id: number) => {
    if (window.confirm('Are you sure you want to delete this habitat?')) {
      deleteHabitat(id)
        .then(() => {
          alert('Habitat deleted successfully!');
          fetchHabitats();
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {habitats.map((habitat) => (
              <TableRow key={habitat.id}>
                <TableCell>{habitat.name}</TableCell>
                <TableCell>{habitat.size}</TableCell>
                <TableCell>{habitat.climate}</TableCell>
                <TableCell>{habitat.suitable_species.join(', ')}</TableCell>
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
