import React, { useEffect, useState } from 'react';
import { getUserTasks, completeTask } from '../services/api';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button
} from '@mui/material';

interface Task {
  id: number;
  animal_name: string;
  feeding_time: string;
  diet_type: string;
  medical_needs: string;
  date: string;
  status: string;
  completion_time: string | null;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await getUserTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleCompleteTask = async (logId: number) => {
    try {
      await completeTask(logId);
      alert('Task marked as completed!');
      loadTasks();
    } catch (error) {
      console.error('Failed to complete task:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        My Assigned Tasks
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Animal</TableCell>
              <TableCell>Feeding Time</TableCell>
              <TableCell>Diet Type</TableCell>
              <TableCell>Medical Needs</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Completion Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No tasks assigned
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.animal_name}</TableCell>
                  <TableCell>{task.feeding_time}</TableCell>
                  <TableCell>{task.diet_type}</TableCell>
                  <TableCell>{task.medical_needs}</TableCell>
                  <TableCell>{task.date}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.completion_time || "Not Completed"}</TableCell>
                  <TableCell>
                    {task.status === "Assigned" ? (
                      <Button variant="contained" color="primary" onClick={() => handleCompleteTask(task.id)}>
                        Finish
                      </Button>
                    ) : (
                      <Typography color="green">Completed</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TaskList;