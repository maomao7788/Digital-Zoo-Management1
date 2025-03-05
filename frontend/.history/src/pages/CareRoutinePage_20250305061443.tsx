import React, { useEffect, useState } from 'react';
import { getCareRoutines, createCareRoutine, deleteCareRoutine, getAnimals, getZookeepers, sendTaskEmail } from '../services/api';
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
  user: { id: number; username: string; email: string };
  user_info: { id: number; username: string; email: string } | null;
  role: string;
  qualifications: string;
  responsibilities: string;
  email: string;
}

interface CareRoutine {
  id?: number;
  animal: number | { id: number; name: string };
  zookeeper: number | { id: number; user_info: { username: string } };
  feeding_time: string;
  diet_type: string;
  medical_needs: string;
  date: string;
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
      console.log("Loaded Care Routines:", response.data);

      // 确保数据格式正确，避免 undefined
      const formattedData = response.data.map((routine: any) => ({
        ...routine,
        animal: routine.animal || { id: 0, name: "Unknown" },
        zookeeper: routine.zookeeper || { id: 0, user_info: { username: "Unknown" } }
      }));

      setCareRoutines(formattedData);
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

      // 发送正确的字段
      const postData = {
        animal_id: typeof newCareRoutine.animal === "number" ? newCareRoutine.animal : newCareRoutine.animal.id,
        zookeeper_id: typeof newCareRoutine.zookeeper === "number" ? newCareRoutine.zookeeper : newCareRoutine.zookeeper.id,
        feeding_time: newCareRoutine.feeding_time,
        diet_type: newCareRoutine.diet_type,
        medical_needs: newCareRoutine.medical_needs,
        date: newCareRoutine.date
      };

      console.log("Final POST Data:", JSON.stringify(postData, null, 2));
      await createCareRoutine(postData);
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
      alert("Failed to create Care Routine");
    }
  };

  const handleDeleteCareRoutine = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Care Routine?");
    if (!confirmDelete) return;

    try {
      await deleteCareRoutine(id);
      alert("Care Routine deleted successfully!");
      loadCareRoutines();
    } catch (error) {
      console.error('Failed to delete care routine:', error);
      alert("Failed to delete Care Routine");
    }
  };

  const handleSendEmail = async (id: number) => {
    try {
      await sendTaskEmail(id);
      alert("Email sent successfully!");
    } catch (error) {
      console.error('Failed to send email:', error);
      alert("Failed to send email");
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
        <TextField type="date" label="Date" value={newCareRoutine.date} onChange={(e) => setNewCareRoutine({ ...newCareRoutine, date: e.target.value })} />
        <TextField type="time" label="Feeding Time" value={newCareRoutine.feeding_time} onChange={(e) => setNewCareRoutine({ ...newCareRoutine, feeding_time: e.target.value })} style={{ marginRight: 10 }} />
        <TextField label="Diet Type" value={newCareRoutine.diet_type} onChange={(e) => setNewCareRoutine({ ...newCareRoutine, diet_type: e.target.value })} style={{ marginRight: 10 }} />
        <TextField label="Medical Needs" value={newCareRoutine.medical_needs} onChange={(e) => setNewCareRoutine({ ...newCareRoutine, medical_needs: e.target.value })} />
        <Button onClick={handleCreateCareRoutine} style={{ marginLeft: 10 }}>Add Care Routine</Button>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {careRoutines.map((routine) => (
              <TableRow key={routine.id}>
                <TableCell>
                  {typeof routine.animal === "number" ? "Unknown" : routine.animal.name}
                </TableCell>
                <TableCell>
                  {typeof routine.zookeeper === "number" ? "Unknown" : routine.zookeeper.user_info.username}
                </TableCell>
                <TableCell>{routine.date}</TableCell>
                <TableCell>{routine.feeding_time}</TableCell>
                <TableCell>{routine.diet_type}</TableCell>
                <TableCell>{routine.medical_needs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CareRoutinePage;
