import React, { useEffect, useState } from 'react';
import { getCareRoutines, createCareRoutine, deleteCareRoutine, getAnimals, getZookeepers } from '../services/api';
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
  Select,
  MenuItem,
  TextField
} from '@mui/material';

interface Animal {
  id: number;
  name: string;
}
interface User {
    id: number;
    username: string;
    email: string;
  }
interface Zookeeper {
  id: number;
  user: {
    username: string;
  };
  user_info: User | null;
}

interface CareRoutine {
  id?: number;
  animal: number;
  feeding_time: string;
  diet_type: string;
  medical_needs: string;
  zookeeper: number;
  date:string;
}

const CareRoutinePage: React.FC = () => {
  const [careRoutines, setCareRoutines] = useState<CareRoutine[]>([]);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [zookeepers, setZookeepers] = useState<Zookeeper[]>([]);
  const [newCareRoutine, setNewCareRoutine] = useState<CareRoutine>({
    animal: 0,
    feeding_time: '',
    diet_type: '',
    medical_needs: '',
    zookeeper: 0,
    date: ''
  });

  useEffect(() => {
    loadCareRoutines();
    loadAnimals();
    loadZookeepers();
  }, []);

  const loadCareRoutines = async () => {
    try {
      const response = await getCareRoutines();
      setCareRoutines(response.data);
    } catch (error) {
      console.error('Failed to fetch care routines:', error);
    }
  };

  const loadAnimals = async () => {
    try {
      const response = await getAnimals();
      setAnimals(response.data);
    } catch (error) {
      console.error('Failed to fetch animals:', error);
    }
  };


  const loadZookeepers = async () => {
    try {
      const response = await getZookeepers();
      setZookeepers(response.data);
    } catch (error) {
      console.error('Failed to fetch zookeepers:', error);
    }
  };

  const handleCreateCareRoutine = async () => {
    try {
      if (!newCareRoutine.animal || !newCareRoutine.zookeeper || !newCareRoutine.date) {
        alert("Please select an animal, a zookeeper, and a date.");
        return;
      }
      
      await createCareRoutine(newCareRoutine);
      alert("Care Routine created successfully!");
  
      setNewCareRoutine({
        animal: 0,
        feeding_time: '',
        diet_type: '',
        medical_needs: '',
        zookeeper: 0,
        date: '' 
      });
  
      loadCareRoutines();
    } catch (error) {
      console.error('Failed to create care routine:', error);
      alert("Failed to create Care Routine ");
    }
  };

  const handleDeleteCareRoutine = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Care Routine? ");
    if (!confirmDelete) return;

    try {
      await deleteCareRoutine(id);
      alert("Care Routine deleted successfully! ");
      loadCareRoutines();
    } catch (error) {
      console.error('Failed to delete care routine:', error);
      alert("Failed to delete Care Routine ");
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Care Routines
      </Typography>
      <Paper sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>
          Add New Care Routine
        </Typography>
        <Select
          value={newCareRoutine.animal}
          onChange={(e) => setNewCareRoutine({ ...newCareRoutine, animal: Number(e.target.value) })}
          displayEmpty
          style={{ marginRight: 10, minWidth: 200 }}
        >
          <MenuItem value={0}>Select an Animal</MenuItem>
          {animals.map((animal) => (
            <MenuItem key={animal.id} value={animal.id}>{animal.name}</MenuItem>
          ))}
        </Select>

        <Select
            value={newCareRoutine.zookeeper}
            onChange={(e) => {
                console.log("Selected Zookeeper ID:", e.target.value); 
                setNewCareRoutine({ ...newCareRoutine, zookeeper: Number(e.target.value) });
            }}
            displayEmpty
            style={{ marginRight: 10, minWidth: 200 }}
            >
            <MenuItem value={0}>Select a Zookeeper</MenuItem>
            {zookeepers.map((keeper) => (
                <MenuItem key={keeper.id} value={keeper.id}>
                {keeper.user_info?.username || "Unknown"} 
                </MenuItem>
            ))}
        </Select>
        <TextField
            type="date"
            label="Date"
            InputLabelProps={{ shrink: true }}  
            value={newCareRoutine.date}
            onChange={(e) => setNewCareRoutine({ ...newCareRoutine, date: e.target.value })}
        />
        <TextField
          type="time"
          label="Feeding Time"
          value={newCareRoutine.feeding_time}
          onChange={(e) => setNewCareRoutine({ ...newCareRoutine, feeding_time: e.target.value })}
          style={{ marginRight: 10 }}
        />
        <TextField
          label="Diet Type"
          value={newCareRoutine.diet_type}
          onChange={(e) => setNewCareRoutine({ ...newCareRoutine, diet_type: e.target.value })}
          style={{ marginRight: 10 }}
        />
        <TextField
          label="Medical Needs"
          value={newCareRoutine.medical_needs}
          onChange={(e) => setNewCareRoutine({ ...newCareRoutine, medical_needs: e.target.value })}
        />
        <Button variant="contained" color="primary" onClick={handleCreateCareRoutine} style={{ marginLeft: 10 }}>
          Add Care Routine
        </Button>
      </Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Animal</TableCell>
              <TableCell>Zookeeper</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Feeding Time</TableCell>
              <TableCell>Diet Type</TableCell>
              <TableCell>Medical Needs</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {careRoutines.map((routine) => (
              <TableRow key={routine.id}>
                <TableCell>{animals.find(a => a.id === routine.animal)?.name || "Unknown"}</TableCell>
                <TableCell>{zookeepers.find(z => z.id === routine.zookeeper)?.user_info?.username || "Unknown"}</TableCell>
                <TableCell>{routine.date}</TableCell>
                <TableCell>{routine.feeding_time}</TableCell>
                <TableCell>{routine.diet_type}</TableCell>
                <TableCell>{routine.medical_needs}</TableCell>
                <TableCell>
                  <Button variant="contained" color="error" onClick={() => handleDeleteCareRoutine(routine.id!)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CareRoutinePage;
